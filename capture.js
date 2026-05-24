const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set viewport for consistent screenshots
  await page.setViewport({ width: 1280, height: 800 });

  console.log('Capturing Figure 4.1');
  await page.goto('http://localhost:5001/index.html', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'client/figure-4-1.png', fullPage: true });

  console.log('Capturing Figure 4.2');
  await page.goto('http://localhost:5001/blogs.html', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'client/figure-4-2.png', fullPage: true });

  console.log('Capturing Figure 4.3');
  await page.goto('http://localhost:5001/login.html', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'client/figure-4-3.png', fullPage: true });

  console.log('Logging in...');
  await page.type('#loginEmail', 'admin@example.com');
  await page.type('#loginPassword', 'password123');
  await page.click('button[type="submit"]');
  await page.waitForNavigation({ waitUntil: 'networkidle2' });

  console.log('Capturing Figure 4.4');
  await page.goto('http://localhost:5001/add-blog.html', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'client/figure-4-4.png', fullPage: true });

  console.log('Capturing Figure 4.5');
  await page.goto('http://localhost:5001/admin.html', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'client/figure-4-5.png', fullPage: true });

  await browser.close();
  console.log('All screenshots captured successfully.');
})();
