import json
import time
from playwright.sync_api import sync_playwright

BASE = "http://127.0.0.1:8765"
PAGES = [
    "/",
    "/fullfinger.html",
    "/fitness.html",
    "/winter.html",
    "/golf.html",
    "/private-label-oem.html",
    "/mtb/gmt-003.html",
    "/mtb/gmt-018.html",
    "/winter/gwo-021.html",
]
VIEWPORTS = [
    ("small-phone", 360, 800, True),
    ("phone", 390, 844, True),
    ("tablet", 768, 1024, True),
    ("desktop", 1440, 900, False),
]
results = []
failures = []

INIT = r"""
window.__griporaVitals = {lcp: null, cls: 0};
try {
  new PerformanceObserver(list => {
    for (const entry of list.getEntries()) {
      window.__griporaVitals.lcp = Math.round(entry.startTime);
    }
  }).observe({type: "largest-contentful-paint", buffered: true});
  new PerformanceObserver(list => {
    for (const entry of list.getEntries()) {
      if (!entry.hadRecentInput) window.__griporaVitals.cls += entry.value;
    }
  }).observe({type: "layout-shift", buffered: true});
} catch (_) {}
"""

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True, args=["--no-sandbox", "--disable-dev-shm-usage"])
    for path in PAGES:
        for label, width, height, mobile in VIEWPORTS:
            context = browser.new_context(
                viewport={"width": width, "height": height},
                device_scale_factor=2 if mobile else 1,
                is_mobile=mobile,
                has_touch=mobile,
            )
            page = context.new_page()
            page.add_init_script(INIT)
            page_errors = []
            page.on("pageerror", lambda error: page_errors.append(str(error)))
            cdp = context.new_cdp_session(page)
            cdp.send("Network.enable")
            if mobile:
                cdp.send("Network.emulateNetworkConditions", {
                    "offline": False,
                    "latency": 150,
                    "downloadThroughput": 1.6 * 1024 * 1024 / 8,
                    "uploadThroughput": 750 * 1024 / 8,
                    "connectionType": "cellular4g",
                })
                cdp.send("Emulation.setCPUThrottlingRate", {"rate": 4})

            started = time.monotonic()
            response = page.goto(BASE + path, wait_until="domcontentloaded", timeout=30000)
            page.wait_for_timeout(350)
            initial_metrics = page.evaluate("""() => ({
                vitals: window.__griporaVitals,
                transferBytes: performance.getEntriesByType('resource')
                  .reduce((sum, entry) => sum + (entry.transferSize || 0), 0),
                domContentLoadedMs: Math.round(performance.getEntriesByType('navigation')[0]?.domContentLoadedEventEnd || 0)
            })""")

            if response is None or response.status != 200:
                failures.append({"page": path, "viewport": label, "issue": "HTTP", "status": response.status if response else None})

            # Check mobile menu open/close on phone widths on the homepage and OEM page.
            if mobile and width <= 390 and path in ("/", "/private-label-oem.html"):
                try:
                    page.locator("#open-menu").click(timeout=4000)
                    opened = page.locator("body").evaluate("(el) => el.classList.contains('menu-open')")
                    aria_open = page.locator("#mobile-menu").get_attribute("aria-hidden") == "false"
                    if not opened or not aria_open:
                        failures.append({"page": path, "viewport": label, "issue": "mobile menu did not open"})
                    page.locator("#close-menu").click(timeout=4000)
                    closed = not page.locator("body").evaluate("(el) => el.classList.contains('menu-open')")
                    if not closed:
                        failures.append({"page": path, "viewport": label, "issue": "mobile menu did not close"})
                except Exception as exc:
                    failures.append({"page": path, "viewport": label, "issue": "mobile menu interaction", "detail": str(exc)[:240]})

            # Scroll through each page to trigger native lazy-loaded product images.
            page_height = page.evaluate("document.documentElement.scrollHeight")
            for y in range(0, max(page_height, height), 550):
                page.evaluate("(y) => window.scrollTo(0, y)", y)
                page.wait_for_timeout(150)
            try:
                page.wait_for_function(
                    "Array.from(document.images).filter(img => img.hasAttribute('src')).every(img => img.complete)",
                    timeout=45000,
                )
            except Exception:
                pass
            page.wait_for_timeout(250)
            page.evaluate("window.scrollTo(0, 0)")

            layout = page.evaluate("""() => ({
                viewport: document.documentElement.clientWidth,
                document: document.documentElement.scrollWidth,
                body: document.body.scrollWidth,
                missingDimensions: Array.from(document.images)
                  .filter(img => (img.hasAttribute('src') || img.dataset.src) &&
                    (!img.getAttribute('width') || !img.getAttribute('height')))
                  .map(img => img.currentSrc || img.dataset.src || img.src),
                brokenImages: Array.from(document.images)
                  .filter(img => img.hasAttribute('src') && (!img.complete || img.naturalWidth === 0))
                  .map(img => img.currentSrc || img.src),
                externalPreviewImages: Array.from(document.images)
                  .filter(img => /gripora-v86-badges-preview/.test(img.src || img.dataset.src || ''))
                  .map(img => img.src || img.dataset.src),
                newTabLinks: document.querySelectorAll('a[target="_blank"]').length,
                toolbar: !!document.querySelector('script[src*="vercel.live"]'),
                vitals: window.__griporaVitals,
                transferBytes: performance.getEntriesByType('resource')
                  .reduce((sum, entry) => sum + (entry.transferSize || 0), 0),
                domContentLoadedMs: Math.round(performance.getEntriesByType('navigation')[0]?.domContentLoadedEventEnd || 0)
            })""")

            if layout["document"] > layout["viewport"] + 1 or layout["body"] > layout["viewport"] + 1:
                failures.append({"page": path, "viewport": label, "issue": "horizontal overflow", "layout": layout})
            if layout["missingDimensions"]:
                failures.append({"page": path, "viewport": label, "issue": "images missing intrinsic dimensions", "items": layout["missingDimensions"][:5]})
            if layout["brokenImages"]:
                failures.append({"page": path, "viewport": label, "issue": "broken image", "items": layout["brokenImages"][:5]})
            if layout["externalPreviewImages"]:
                failures.append({"page": path, "viewport": label, "issue": "external preview image dependency"})
            if layout["newTabLinks"] or layout["toolbar"]:
                failures.append({"page": path, "viewport": label, "issue": "navigation/toolbar regression"})
            if page_errors:
                failures.append({"page": path, "viewport": label, "issue": "JavaScript page error", "items": page_errors[:3]})

            results.append({
                "page": path,
                "viewport": label,
                "http": response.status if response else None,
                "loadMs": round((time.monotonic() - started) * 1000),
                "horizontalOverflow": layout["document"] > layout["viewport"] + 1 or layout["body"] > layout["viewport"] + 1,
                "images": len(page.locator("img").all()),
                "initialTransferBytes": initial_metrics["transferBytes"],
                "totalTransferBytes": layout["transferBytes"],
                "domContentLoadedMs": initial_metrics["domContentLoadedMs"],
                "lcpMs": initial_metrics["vitals"]["lcp"],
                "cls": round(layout["vitals"]["cls"], 4),
            })
            context.close()

    browser.close()

summary = {
    "browser": "Chromium mobile/tablet/desktop emulation",
    "network": "simulated 4G + 4x CPU throttling on mobile/tablet viewports",
    "pages": len(PAGES),
    "viewports": len(VIEWPORTS),
    "checks": len(results),
    "failures": failures,
    "sampleMetrics": results,
}
print("GRIPORA_RESPONSIVE_MOBILE_QA " + json.dumps(summary, separators=(",", ":")))
if failures:
    raise SystemExit("GRIPORA responsive mobile QA failed")
print("GRIPORA_RESPONSIVE_MOBILE_QA_PASS")
