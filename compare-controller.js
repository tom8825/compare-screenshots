const screenshot = require('./screenshot');
const compare = require('./compare');
const readline = require('readline');
const fs = require('fs');
let config = [];
let fileNames = [];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Please enter a lable for this test (use \'-\' instead of spaces) : ', (answer1) => {
  config.push(answer1);
  if (!fs.existsSync("compare-images/" + answer1)) {
    fs.mkdirSync("compare-images/" + answer1, function (err) {
      if (err) {
        console.log(err);
        // echo the result back
        response.send("ERROR! Can't make the directory! \n");
      }
    });
  }
  rl.question('Please enter the first URL : ', (answer2) => {
    config.push(answer2);
    rl.question('Please enter the second URL : ', (async (answer3) => {
      config.push(answer3);
      rl.close();
      console.log(config);
      fileNames.push(await screenshot.takeScreenShot(config, 1));
      fileNames.push(await screenshot.takeScreenShot(config, 2));
      //needs to be ran after the functions above have finished.
      compare.compareScreenShots(fileNames[0], fileNames[1], config);
    }));
  });
});

