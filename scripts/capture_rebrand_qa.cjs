const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUTPUT_DIR = path.resolve('C:/Users/aksha/.gemini/antigravity/brain/5af10971-c60a-4ba3-8f1f-63b2fa953de2/qa_screenshots');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function capture() {
  const browser = await chromium.launch({ headless: true });

  // 1. Desktop (1920x1080)
  {
    console.log('Capturing Desktop 1920px...');
    const context = await browser.newContext({
      viewport: { width: 1920, height: 1080 },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Capture Hero
    const heroEl = await page.$('#hero');
    if (heroEl) {
      await heroEl.screenshot({ path: path.join(OUTPUT_DIR, 'desktop_hero.png') });
      console.log('Saved desktop_hero.png');
    }

    // Scroll to Features
    await page.evaluate(() => {
      document.querySelector('#features')?.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await page.waitForTimeout(1000);
    const featEl = await page.$('#features');
    if (featEl) {
      await featEl.screenshot({ path: path.join(OUTPUT_DIR, 'desktop_features.png') });
      console.log('Saved desktop_features.png');
    }

    // Scroll to Pricing
    await page.evaluate(() => {
      document.querySelector('#pricing')?.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await page.waitForTimeout(1000);
    const priceEl = await page.$('#pricing');
    if (priceEl) {
      await priceEl.screenshot({ path: path.join(OUTPUT_DIR, 'desktop_pricing.png') });
      console.log('Saved desktop_pricing.png');
    }

    // Scroll to Footer
    await page.evaluate(() => {
      document.querySelector('footer')?.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await page.waitForTimeout(1000);
    const footerEl = await page.$('footer');
    if (footerEl) {
      await footerEl.screenshot({ path: path.join(OUTPUT_DIR, 'desktop_footer.png') });
      console.log('Saved desktop_footer.png');
    }

    await context.close();
  }

  // 2. Mobile (390x844)
  {
    console.log('Capturing Mobile 390px...');
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
    });
    const page = await context.newPage();
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);

    // Capture Hero
    const heroEl = await page.$('#hero');
    if (heroEl) {
      await heroEl.screenshot({ path: path.join(OUTPUT_DIR, 'mobile_hero.png') });
      console.log('Saved mobile_hero.png');
    }

    // Scroll to Features
    await page.evaluate(() => {
      document.querySelector('#features')?.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await page.waitForTimeout(1000);
    const featEl = await page.$('#features');
    if (featEl) {
      await featEl.screenshot({ path: path.join(OUTPUT_DIR, 'mobile_features.png') });
      console.log('Saved mobile_features.png');
    }

    // Scroll to Pricing
    await page.evaluate(() => {
      document.querySelector('#pricing')?.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await page.waitForTimeout(1000);
    const priceEl = await page.$('#pricing');
    if (priceEl) {
      await priceEl.screenshot({ path: path.join(OUTPUT_DIR, 'mobile_pricing.png') });
      console.log('Saved mobile_pricing.png');
    }

    // Scroll to Footer
    await page.evaluate(() => {
      document.querySelector('footer')?.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await page.waitForTimeout(1000);
    const footerEl = await page.$('footer');
    if (footerEl) {
      await footerEl.screenshot({ path: path.join(OUTPUT_DIR, 'mobile_footer.png') });
      console.log('Saved mobile_footer.png');
    }

    await context.close();
  }

  await browser.close();
  console.log('All QA screenshots captured successfully!');
}

capture().catch((err) => {
  console.error('Error capturing screenshots:', err);
  process.exit(1);
});

