const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUTPUT_DIR = path.resolve('C:/Users/aksha/.gemini/antigravity-ide/brain/9493400e-8573-4354-b1d5-dfcf2e75129e/qa_screenshots');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function capture() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true
  });

  const page = await context.newPage();
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  // Scroll page top to bottom once so reveals/pins run
  await page.evaluate(async () => {
    const scrollStep = 350;
    const delay = 40;
    const total = document.documentElement.scrollHeight;
    for (let y = 0; y < total; y += scrollStep) {
      window.scrollTo(0, y);
      await new Promise(r => setTimeout(r, delay));
    }
    window.scrollTo(0, document.documentElement.scrollHeight);
    await new Promise(r => setTimeout(r, 200));
    window.scrollTo(0, 0);
    await new Promise(r => setTimeout(r, 300));
  });

  await page.waitForTimeout(1000);

  // 1. Features (slide 1)
  await page.evaluate(() => {
    const el = document.querySelector('#features');
    el.scrollIntoView({ block: 'start', inline: 'nearest' });
  });
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(OUTPUT_DIR, '01_features_slide1.png') });
  console.log('Saved 01_features_slide1.png');

  // 2. Features (slide 3)
  await page.evaluate(() => {
    const carousel = document.querySelector('.features-carousel-container');
    if (carousel && carousel.children[2]) {
      carousel.children[2].scrollIntoView({ behavior: 'smooth', inline: 'start' });
    }
  });
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(OUTPUT_DIR, '02_features_slide3.png') });
  console.log('Saved 02_features_slide3.png');

  // 3. Process (step 1 open)
  await page.evaluate(() => {
    const el = document.querySelector('#process');
    el.scrollIntoView({ block: 'start', inline: 'nearest' });
  });
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(OUTPUT_DIR, '03_process_step1_open.png') });
  console.log('Saved 03_process_step1_open.png');

  // 4. Process (step 3 open)
  await page.evaluate(() => {
    const stepBtns = document.querySelectorAll('#process button');
    // Button index 2 is step 3 (0: step 1, 1: step 2, 2: step 3)
    if (stepBtns && stepBtns[2]) {
      stepBtns[2].click();
    }
  });
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(OUTPUT_DIR, '04_process_step3_open.png') });
  console.log('Saved 04_process_step3_open.png');

  // 5. WhyAutomate
  await page.evaluate(() => {
    const el = document.querySelector('#why');
    el.scrollIntoView({ block: 'start', inline: 'nearest' });
  });
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(OUTPUT_DIR, '05_why_automate.png') });
  console.log('Saved 05_why_automate.png');

  // 6. Pricing (tab 1: Starter)
  await page.evaluate(() => {
    const el = document.querySelector('#pricing');
    el.scrollIntoView({ block: 'start', inline: 'nearest' });
  });
  await page.waitForTimeout(600);
  // Click Starter button
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('#pricing button'));
    const starterBtn = btns.find(b => b.textContent && b.textContent.trim().toUpperCase() === 'STARTER');
    if (starterBtn) starterBtn.click();
  });
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(OUTPUT_DIR, '06_pricing_starter.png') });
  console.log('Saved 06_pricing_starter.png');

  // 7. Pricing (tab 2: Growth)
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('#pricing button'));
    const growthBtn = btns.find(b => b.textContent && b.textContent.trim().toUpperCase() === 'GROWTH');
    if (growthBtn) growthBtn.click();
  });
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(OUTPUT_DIR, '07_pricing_growth.png') });
  console.log('Saved 07_pricing_growth.png');

  // 8. FAQ
  await page.evaluate(() => {
    const el = document.querySelector('#faq');
    el.scrollIntoView({ block: 'start', inline: 'nearest' });
  });
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(OUTPUT_DIR, '08_faq.png') });
  console.log('Saved 08_faq.png');

  // 9. Contact
  await page.evaluate(() => {
    const el = document.querySelector('#contact');
    el.scrollIntoView({ block: 'start', inline: 'nearest' });
  });
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(OUTPUT_DIR, '09_contact.png') });
  console.log('Saved 09_contact.png');

  // 10. Hamburger menu open
  await page.evaluate(() => {
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(400);
  // Tap menu toggle button
  await page.evaluate(() => {
    const menuBtn = document.querySelector('header button[aria-label*="menu" i], nav button[aria-label*="menu" i], button[aria-expanded]');
    if (menuBtn) menuBtn.click();
  });
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(OUTPUT_DIR, '10_hamburger_menu_open.png') });
  console.log('Saved 10_hamburger_menu_open.png');

  await browser.close();
  console.log('All QA screenshots captured successfully!');
}

capture().catch(err => {
  console.error(err);
  process.exit(1);
});
