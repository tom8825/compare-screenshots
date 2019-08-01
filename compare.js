const fs = require('fs');
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');

module.exports = {
    compareScreenShots: function (image1, image2, label) {
        console.log("Comparing screenshots...");
        const img1 = PNG.sync.read(fs.readFileSync(image1));
        const img2 = PNG.sync.read(fs.readFileSync(image2));
        const { width, height } = img1;
        const diff = new PNG({ width, height });

        pixelmatch(img1.data, img2.data, diff.data, width, height, { threshold: 0.1 });

        fs.writeFileSync('images/'+label+'diff.png', PNG.sync.write(diff));

        console.log("Comparison complete and an image has been created.");
    }
};