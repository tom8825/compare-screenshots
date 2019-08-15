const express = require('express');
const fs = require("fs");
const testFolder = "./regression-images/";
const app = express();

app.get('/api/customers', (req, res) => {
    let option = [];
    let optionNumber = 1;
    fs.readdir(testFolder, (err, files) => {
        console.log(files);
        files.forEach(file => {
            
            option.push({
                id:   optionNumber,
                name: file
            });

            
            optionNumber++;
        });
        console.log(option);
        res.json(option);
    });



});

app.post('/api/post', function (req, res) {
    res.send(() => console.log('test'))
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);