const fs = require('fs');
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');
let testThreshold = 5;

module.exports = {
    compareScreenShots: async function (image1, image2, config) {
        console.log("Comparing screenshots...");
        const img1 = PNG.sync.read(await fs.readFileSync('compare-images/' + config[0] + "/" + image1));
        const img2 = PNG.sync.read(await fs.readFileSync('compare-images/' + config[0] + "/" + image2));
        const { width, height } = img1;
        const diff = new PNG({ width, height });

        let numDiffPixels = pixelmatch(img1.data, img2.data, diff.data, width, height, { threshold: 0.1 });

        fs.writeFileSync('compare-images/' + config[0] + "/" + config[0] + '-diff.png', PNG.sync.write(diff));

        //this does not display % diff correctly
        let percentDiff = parseFloat(numDiffPixels/(width*height)*100).toFixed(3);
        console.log("Comparison complete and an image has been created.");
        if(percentDiff>testThreshhold){
            console.log("--- Test FAILED --- Difference above "+testThreshold+"% threshold @ "+percentDiff+"%.")
        }else{
            console.log("--- Test PASSED --- Difference below "+testThreshold+"% threshold @ "+percentDiff+"%.")
        }

        
    }
};