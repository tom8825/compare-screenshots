const rc = require('./regression-controller');
const cc = require('./compare-controller');
const inquirer = require('inquirer');


function menu() {

    inquirer
      .prompt([
        {
          name: "mainMenu",
          type: "list",
          message: "Choose from the following options:",
          choices: ["Webpage comparison", "Webpage regression testing"],
          default: 3
        }
      ])
      .then(answers => {
        if (answers["mainMenu"] == "Webpage comparison") {
          cc.compareMenu();
        } else if (answers["mainMenu"] == "Webpage regression testing") {
          rc.regressionMenu();
        }
      });
}

menu();