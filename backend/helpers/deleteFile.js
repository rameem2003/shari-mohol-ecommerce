const fs = require("fs");
const deleteFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.log("we cant delete the file", err);
        resolve();
        // reject(err);
      } else {
        resolve();
      }
    });
  });
};

module.exports = deleteFile;
