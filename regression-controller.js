const screenshot = require("./regression-screenshot");
const fs = require("fs");
const compare = require("./compare");
const inquirer = require('inquirer');
const readline = require("readline");
let config = [];
let fileNames = [];

module.exports = {
  regressionMenu: function() {
     
    inquirer
      .prompt([
        {
          name: "reg-con-menu",
          type: "list",
          message: "Choose from the following options:",
          choices: ["Create new project", "Set new base image for a project", "Compare new image to base and set new base"],
          default: 3
        }
      ])
      .then(answers => {
        if (answers["reg-con-menu"] == "Create new project") {
            createNewProject();
          } else if (answers["reg-con-menu"] == "Set new base image for a project") {
            setNewBase();
          } else if (answers["reg-con-menu"] == "Compare new image to base and set new base") {
            compareNewToBase();
          }
      });
  }
};

function createNewProject() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question("Please enter a label for this project : ", answer1 => {
    config.push(answer1);
    rl.question("Please enter the page URL : ", async answer2 => {
      config.push(answer2);
      if (!fs.existsSync("regression-images/" + answer1)) {
        fs.mkdirSync("regression-images/" + answer1, function(err) {
          if (err) {
            console.log(err);
            // echo the result back
            response.send("ERROR! Can't make the directory! \n");
          }
        });
      }
      console.log("Taking base screenshot...");
      await screenshot.takeBaseScreenShot(config);
      rl.close();
    });
  });
}

function setNewBase() {
  const fs = require("fs");
  const testFolder = "./regression-images/";
  let optionNumber = 1;
  let option = [];

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log("Choose a project from the following list: ");
  fs.readdir(testFolder, (err, files) => {
    files.forEach(file => {
      console.log(optionNumber + ". " + file);
      option.push(file);
      optionNumber++;
    });
  });
  rl.question("", answer => {
    option = option[answer - 1];
    rl.question("Please enter URL: ", async answer2 => {
      await config.push(option);
      await config.push(answer2);
      console.log(config);
      await screenshot.takeBaseScreenShot(config);
      rl.close();
    });
  });
}

function compareNewToBase() {
  const fs = require("fs");
  const testFolder = "./regression-images/";
  const dates = Date.now();
  let optionNumber = 1;
  let option = [];

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log("Choose a project from the following list: ");
  fs.readdir(testFolder, (err, files) => {
    files.forEach(file => {
      console.log(optionNumber + ". " + file);
      option.push(file);
      optionNumber++;
    });
  });
  rl.question("", answer => {
    option = option[answer - 1];
    rl.question("Please enter URL: ", async answer2 => {
      await config.push(option);
      await config.push(answer2);
      console.log(config);
      let regImage = await screenshot.takeRegScreenShot(config);

      await fs.rename(
        "regression-images/" + option + "/" + option + "-base.png",
        "regression-images/" + option + "/" + option + "-" + dates + ".png",
        function(err) {
          if (err) console.log("ERROR: " + err);
        }
      );

      await compare.compareRegScreenShots(
        option + "-" + dates + ".png",
        regImage,
        config
      );

      await fs.rename(
        "regression-images/" + option + "/" + regImage,
        "regression-images/" + option + "/" + option + "-base.png",
        function(err) {
          if (err) console.log("ERROR: " + err);
        }
      );

      await console.log("New base image set...");
      await console.log("Done!");
      rl.close();
    });
  });
}
