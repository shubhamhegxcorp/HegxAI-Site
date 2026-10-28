const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUTPUT_DIR = path.resolve('C:/Users/aksha/.gemini/antigravity/brain/5af10971-c60a-4ba3-8f1f-63b2fa953de2/nav_screenshots');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function capture() {
  const browser = await chromium.launch({ headless: true });

  // 1. Desktop 1920
  {
    const context = await browser.newContext({
      viewport: { width: 1920, height: 1080 },
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    // Full header
    const header = await page.$('header');
    if (header) {
      await header.screenshot({ path: path.join(OUTPUT_DIR, 'nav_after_fixed_1920.png') });
      console.log('Saved nav_after_fixed_1920.png');
    }

    // Logo lockup crop
    const logoLink = await page.$('header a[aria-label="HEGXAI - home"]');
    if (logoLink) {
      await logoLink.screenshot({ path: path.join(OUTPUT_DIR, 'header_logo_crop_1920.png') });
      console.log('Saved header_logo_crop_1920.png');
    }
    await context.close();
  }

  // 2. Mobile 390
  {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
    });
    const page = await context.newPage();
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    // Full header
    const header = await page.$('header');
    if (header) {
      await header.screenshot({ path: path.join(OUTPUT_DIR, 'nav_after_fixed_390.png') });
      console.log('Saved nav_after_fixed_390.png');
    }

    // Logo lockup crop (use mobile-specific selector)
    const logoLink = await page.$('.hegxai-mobile-nav-grid a[aria-label="HEGXAI - home"]');
    if (logoLink) {
      await logoLink.screenshot({ path: path.join(OUTPUT_DIR, 'header_logo_crop_390.png') });
      console.log('Saved header_logo_crop_390.png');
    }
    await context.close();
  }

  await browser.close();
}

capture().catch(err => {
  console.error(err);
  process.exit(1);
});

