const fs = require("fs");
const path = require("path");
const deleteFile = (relativePath, actualFileName) => {
  fs.unlink(`${path.join(__dirname, relativePath, actualFileName)}`, (err) => {
    if (err) {
      console.log(err);
    }

    console.log("File delete");
  });
};

module.exports = deleteFile;
