/* eslint-disable @typescript-eslint/no-require-imports */
const { chromium } = require('playwright');
const fs = require('node:fs');
const assert = require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true});
 const report={overflow:[], layouts:[], menu:[], reducedMotion:[]};
 const page=await browser.newPage();
 const move=async(y)=>{await page.evaluate(y=>{if(window.__lenis) window.__lenis.scrollTo(y,{immediate:true,force:true});else window.scrollTo({top:y,behavior:'instant'});},y);await page.waitForTimeout(100);};
 const sweep=async()=>{const height=await page.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<height;y+=600) await move(y);await page.waitForTimeout(1200);};
 for(const width of [360,390,430,768,1024]){
   console.log("viewport", width);
   await page.setViewportSize({width,height:width===768?1024:844});
   await page.goto('http://localhost:3000',{waitUntil:'networkidle'});
   await page.evaluate(()=>document.fonts.ready);
   await sweep();
   const dimensions=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth}));
   report.overflow.push(dimensions);assert.ok(dimensions.scrollWidth<=dimensions.width,JSON.stringify(dimensions));
   for(const [name,selector] of [['hero','#hero'],['about','#about'],['features','#features'],['footer','footer']]){
     console.log(width,name);
     const y=await page.locator(selector).evaluate(el=>el.getBoundingClientRect().top+scrollY);
     await move(name==='hero'?0:y-parseInt(await page.evaluate(()=>getComputedStyle(document.documentElement).getPropertyValue('--header-h'))));
     await page.waitForTimeout(1500);
     const issues=await page.locator(selector).evaluate(el=>[...el.querySelectorAll('h1,h2,h3,p,a,svg')].filter(e=>{
       const r=e.getBoundingClientRect(),s=getComputedStyle(e);return r.width>0&&s.visibility!=='hidden'&&s.display!=='none'&&(r.right>innerWidth+1||r.left < -1);
     }).map(e=>({tag:e.tagName,text:e.textContent.slice(0,60)})));
     report.layouts.push({width,name,outsideViewport:issues});
     if(width===390||width===768) await page.screenshot({path:`artifacts/mobile-pass-2/${width}-${name}.png`});
     if(name==='features'&&width<768){
       assert.equal(await page.locator('#features a[href="#contact"]:visible').count(),1);
       assert.equal(await page.locator('#features').getByText('ACTIVE',{exact:true}).count(),0);
       for(let i=1;i<=2;i++){
         await page.locator('.features-mobile-card').nth(i).scrollIntoViewIfNeeded();await page.waitForTimeout(500);
         if(width===390)await page.screenshot({path:`artifacts/mobile-pass-2/${width}-feature-${i+1}.png`});
       }
     }
   }
   if(width===390){
     await move(0);await page.waitForTimeout(500);
     console.log('menu checks');
     const open=page.getByRole('button',{name:'Open Navigation Menu'});
     await open.click();await page.getByRole('dialog',{name:'Mobile Navigation',exact:true}).waitFor();
     assert.equal(await page.evaluate(()=>window.__lenis?.isStopped),true);
     const y=await page.evaluate(()=>scrollY);await page.mouse.wheel(0,500);await page.waitForTimeout(200);assert.equal(await page.evaluate(()=>scrollY),y);
     await page.keyboard.press('Escape');await page.getByRole('dialog').waitFor({state:'detached'});
     assert.equal(await page.evaluate(()=>window.__lenis?.isStopped),false);report.menu.push('open, locked scrolling, Escape close, Lenis restored');
     await open.click();await page.getByRole('button',{name:'Close Navigation Menu'}).click();assert.equal(await page.evaluate(()=>window.__lenis?.isStopped),false);
     for(const label of ['ABOUT','SERVICES','PROCESS']){
       console.log('menu', label); await open.click();const link=page.getByRole('dialog').getByRole('link',{name:label,exact:true});const href=await link.getAttribute('href');await link.click();await page.waitForTimeout(2600);
       const top=await page.locator(href).evaluate(e=>e.getBoundingClientRect().top);assert.ok(Math.abs(top-72)<3,`${label} top ${top}`);report.menu.push({label,top});
     }
     const targets=await page.locator('footer .footer-link').evaluateAll(es=>es.map(e=>({height:e.getBoundingClientRect().height,size:getComputedStyle(e).fontSize})));assert.ok(targets.every(e=>e.height>=44&&e.size==='16px'));report.footerTargets=targets;
   }
 }
 await page.emulateMedia({reducedMotion:'reduce'});await page.setViewportSize({width:390,height:844});await page.goto('http://localhost:3000',{waitUntil:'networkidle'});
 report.reducedMotion=await page.locator('#features svg').evaluateAll(es=>es.flatMap(e=>[...e.querySelectorAll('*')]).filter(e=>getComputedStyle(e).animationName!=='none').map(e=>e.tagName));assert.equal(report.reducedMotion.length,0);
 fs.writeFileSync('artifacts/mobile-pass-2/report.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report));await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});

