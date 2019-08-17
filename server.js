const express = require("express");
const fs = require("fs");
const testFolder = "./regression-images/";
const app = express();
const af = require("./api-functions");

app.get("/api/projects", (req, res) => {
  let option = [];
  let optionNumber = 1;
  fs.readdir(testFolder, (err, files) => {
    files.forEach(file => {
      option.push({
        id: optionNumber,
        name: file
      });
      optionNumber++;
    });
    res.json(option);
  });
});

app.post("/api/projects", function(req, res) {
  let projectName = req.param("n");
  af.createNewProject(projectName);
  res.send(projectName);
});

app.post("/api/projects/base-image", async function(req, res) {
  let projectName = req.param("n");
  let url = req.param("url");
  await af.setNewBase(projectName, url);
  await res.send("New base image created for " + projectName);
});

app.post("/api/projects/compare", async function(req, res) {
  let projectName = req.param("n");
  let second = req.param("url");
  await af.compare(projectName, second);
  await res.send("New image comparason for " + projectName);
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);
