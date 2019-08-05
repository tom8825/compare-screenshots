const fs = require("fs");

module.exports = {
  createGallery: function(image1, image2, config) {
    var fs = require("fs");

    var htmlContent =
      "<!DOCTYPE html><html lang='en'><head><title>Gallery</title></head><body><h1>" +
      config[0] +
      "</h1>"+config[2]+"% Difference <br><br><img src='" +
      image1 +
      "' alt='' srcset='' style='width:30%;'><img src='" +
      config[0]+"-base.png" +
      "' alt='' srcset='' style='width:30%;'><img src='" +
      config[0] +
      "-diff.png' alt='' srcset='' style='width:30%;'></body></html>";

    fs.writeFile(
      "regression-images/" + config[0] + "/gallery.html",
      htmlContent,
      error => {
        /* handle error */
      }
    );
    console.log("Gallery Created: regression-images/" +config[0] +"/gallery.html")
  }
};
