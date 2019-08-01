const screenshot = require('./screenshot');
const compare = require('./compare');
const readline = require('readline');
let config = [];
let fileNames = [];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Please enter a lable for this test (use \'-\' instead of spaces) : ', (answer1) => {
  config.push(answer1);
  rl.question('Please enter the first URL : ', (answer2) => {
    config.push(answer2);
    rl.question('Please enter the second URL : ', (async(answer3) => {
      config.push(answer3);
      rl.close();
      console.log(config);
      fileNames.push(await screenshot.takeScreenShot(config, 1));
      fileNames.push(await screenshot.takeScreenShot(config, 2));

      //needs to be ran after the functions above have finished.
      compare.compareScreenShots(fileNames[0], fileNames[1], config[0]);
    }));
  });
});

