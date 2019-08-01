const screenshot = require('./screenshot');
const compare = require('./compare');
const readline = require('readline');
let config = [];
let fileNames = [];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Choose from the following options: \n1. Set new base image. \n2. Compare new image to base.\n', (answer) => {
    console.log(answer)
});
