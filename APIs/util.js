const fs = require("fs");

let users = require("../users");

function writeDataToFile(filename, content) {
  fs.writeFileSync(filename, JSON.stringify(content), "utf8");
}

function findById(id) {
  return new Promise((resolve, reject) => {
    const user = users.find((p) => p.id === id);
    resolve(user);
  });
}
module.exports = { findById, writeDataToFile };
