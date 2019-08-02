const screenshot = require('./regression-screenshot');
const fs = require('fs');
const compare = require('./compare');
const readline = require('readline');
let config = [];
let fileNames = [];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function menu() {
    rl.question('Choose from the following options: \n1. Create new project\n2. Set new base image for a project \n3. Compare new image to base\n', (answer) => {
        if (answer == 1) {
            createNewProject();
        } else if (answer == 2) {
            setNewBase();
        } else if (answer == 3) {
            compareNewToBase();
        }
    });
}

function createNewProject() {
    rl.question('Please enter a label for this project : ', (answer1) => {
        config.push(answer1);
        rl.question('Please enter the page URL : ', (async (answer2) => {
            config.push(answer2);
            if (!fs.existsSync("regression-images/" + answer1)) {
                fs.mkdirSync("regression-images/" + answer1, function (err) {
                    if (err) {
                        console.log(err);
                        // echo the result back
                        response.send("ERROR! Can't make the directory! \n");
                    }
                });
            }
            console.log("Taking base screenshot...")
            await screenshot.takeBaseScreenShot(config);
            await menu();
        }));
    });
}

function setNewBase() {
    const fs = require('fs');
    const testFolder = './regression-images/';
    let optionNumber = 1;
    let option = [];

    console.log('Choose a project from the following list: ');
    fs.readdir(testFolder, (err, files) => {
        files.forEach(file => {
            console.log(optionNumber + ". " + file);
            option.push(file);
            optionNumber++;
        });
    });
    rl.question('', (answer) => {
        option = option[answer - 1];
        rl.question('Please enter URL: ', (async (answer2) => {
            await config.push(option);
            await config.push(answer2);
            console.log(config);
            await screenshot.takeBaseScreenShot(config);
            await menu();
        }));
    });



}

function compareNewToBase() {

}

menu();