const puppeteer = require('puppeteer');
const uuidv4 = require('uuid/v4');
let url = 'https://everest-media.co.uk';
let vp_width = 1920;
let vp_height = 1080;

(async () => {

    // 1. Launch the browser
    const browser = await puppeteer.launch({
        defaultViewport: {
            width: vp_width,
            height: vp_height,
            isLandscape: true
        }
    });

    // 2. Open a new page
    const page = await browser.newPage();

    // 3. Navigate to URL
    await page.goto(url);

    // 4. Take screenshot
    await page.screenshot({ path: 'images/' + uuidv4() + '.png' });

    await browser.close();
})();