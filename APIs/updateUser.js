const { findById } = require("./util.js");
let users = require("../users");
const fs = require("fs");

function writeDataToFile(filename, content) {
  fs.writeFileSync(filename, JSON.stringify(content), "utf8");
}
function update(id, user) {
  return new Promise((resolve, reject) => {
    const index = users.findIndex((p) => p.id === id);
    users[index] = { id, ...user };
    console.log(users[index], " users[index]");
    if (process.env.NODE_ENV !== "test") {
      writeDataToFile("../users.json", users);
    }
    resolve(users[index]);
  });
}

async function updateUser(req, res, id, body) {
  try {
    const user = await findById(id);

    if (!user) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product Not Found" }));
    } else {
      console.log(body);
      const { name, password } = body;

      const userData = {
        name: name,
        password: password,
      };

      const updateUser = await update(id, userData);

      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(updateUser));
    }
  } catch (error) {
    console.log(error);
  }
}
module.exports = { updateUser };
