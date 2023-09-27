const puppeteer = require('puppeteer');
const glob = require('glob-promise'); // Import the 'glob-promise' package if not already installed

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const mdFiles = await glob('RFC_test/*.md');
  
  for (const mdFile of mdFiles) {
    const baseName = mdFile.split('/').pop().replace('.md', '');
    await page.goto(`file:///github/workspace/RFC_pdf/${baseName}.pdf`, { waitUntil: 'networkidle2' });
    await page.pdf({ path: `/github/workspace/RFC_pdf/${baseName}.pdf`, format: 'A4' });
  }

  await browser.close();
})();
