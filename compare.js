const fs = require('fs');
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');

let image1 = 'images/7deb9670-b9e7-4cf7-bcbc-0ecfefca363c.png';
let image2 = 'images/dabd5fb8-f00d-489f-aba7-6ebedc753d99.png';

const img1 = PNG.sync.read(fs.readFileSync(image1));
const img2 = PNG.sync.read(fs.readFileSync(image2));
const { width, height } = img1;
const diff = new PNG({ width, height });

pixelmatch(img1.data, img2.data, diff.data, width, height, { threshold: 0.1 });

fs.writeFileSync('diff.png', PNG.sync.write(diff));