const readline = require('readline');
let lable, url1, url2;

//lable
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('How would you like to label the test?', (answer1) => {
  lable = answer1;
  console.log(`Answer: ${lable}`);

  rl.close();
});
