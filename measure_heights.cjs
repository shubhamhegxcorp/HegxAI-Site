const { chromium } = require('playwright');

const VIEWPORTS = [
  { name: '1920x945', width: 1920, height: 945, isMobile: false },
  { name: '390x844', width: 390, height: 844, isMobile: true }
];

const SECTIONS = [
  '#hero',
  '#about',
  '#features',
  '#why',
  '#services',
  '#process',
  '#pricing',
  '#faq',
  '#contact',
  'footer'
];

async function measure() {
  const browser = await chromium.launch({ headless: true });
  const results = {};

  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2,
      isMobile: vp.isMobile,
      hasTouch: vp.isMobile
    });
    const page = await context.newPage();
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);

    // Scroll top to bottom once so reveals/pins have run
    await page.evaluate(async () => {
      const scrollStep = 400;
      const delay = 50;
      const total = document.documentElement.scrollHeight;
      for (let y = 0; y < total; y += scrollStep) {
        window.scrollTo(0, y);
        await new Promise(r => setTimeout(r, delay));
      }
      window.scrollTo(0, document.documentElement.scrollHeight);
      await new Promise(r => setTimeout(r, 200));
      window.scrollTo(0, 0);
      await new Promise(r => setTimeout(r, 200));
    });

    await page.waitForTimeout(1000);

    const data = await page.evaluate((sections) => {
      const totalHeight = Math.round(document.documentElement.scrollHeight);
      const sectionHeights = {};
      for (const sel of sections) {
        const el = document.querySelector(sel);
        if (el) {
          const rect = el.getBoundingClientRect();
          sectionHeights[sel] = Math.round(el.offsetHeight || rect.height);
        } else {
          sectionHeights[sel] = 0;
        }
      }
      return { totalHeight, sectionHeights };
    }, SECTIONS);

    results[vp.name] = data;
    await context.close();
  }

  await browser.close();
  console.log(JSON.stringify(results, null, 2));
}

measure().catch(err => {
  console.error(err);
  process.exit(1);
});
