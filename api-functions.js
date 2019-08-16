const fs = require("fs");
const screenshot = require("./regression-screenshot");
const compare = require("./compare");
const dates = Date.now();

module.exports = {
    createNewProject: function (fileName) {
        if (!fs.existsSync("regression-images/" + fileName)) {
            fs.mkdirSync("regression-images/" + fileName, function (err) {
                if (err) {
                    console.log(err);
                    // echo the result back
                    response.send("ERROR! Can't make the directory! \n");
                }
            });
        }
    },

    setNewBase: async function (projectname, url) {
        let config = [];
        await config.push(projectname);
        await config.push(url);
        await screenshot.takeBaseScreenShot(config);
    },

    compare: async function (projectname, second) {
        let config = [];
        const dates = Date.now();
        let baseNewName = projectname+"-"+dates+".png";

        await fs.rename(
            "regression-images/" + projectname + "/" + projectname + "-base.png",
            "regression-images/" + projectname + "/" + baseNewName,
            function (err) {
                if (err) console.log("ERROR: " + err);
            }
        );

        await config.push(projectname);
        await config.push(second);
        let regImage = await screenshot.takeRegScreenShot(config);
        await compare.compareRegScreenShots(baseNewName, regImage, config);

        await fs.rename(
            "regression-images/" + projectname + "/" + regImage,
            "regression-images/" + projectname + "/" + projectname + "-base.png",
            function(err) {
              if (err) console.log("ERROR: " + err);
            }
          );
    }
}