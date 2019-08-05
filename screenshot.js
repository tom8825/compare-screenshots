const puppeteer = require('puppeteer');
const uuidv4 = require('uuid/v4');
const fs = require('fs');

module.exports = {
    takeScreenShot: async function (config, urlNumber) {
        let url = config[urlNumber];
        let vp_width = 1920;
        let vp_height = 1080;
        let fileName = config[0] + '-' + Date.now() + '.png';

        console.log("Taking screenshot...")

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
        
        await page.screenshot({ path: 'compare-images/' + config[0] + "/" + fileName });

        await browser.close();

        // 5. Log result
        
        console.log("Screenshot taken for URL: " + config[urlNumber]);


        return fileName;
    }
};
