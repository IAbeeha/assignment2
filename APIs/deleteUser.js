const { findById, writeDataToFile } = require("./util.js");
let users = require("../users");
const fs = require("fs");

function remove(id) {
  return new Promise((resolve, reject) => {
    users = users.filter((p) => p.id !== id);
    if (process.env.NODE_ENV !== "test") {
      writeDataToFile("../users.json", users);
    }
    resolve();
  });
}

async function deleteUser(req, res, id) {
  try {
    const user = await findById(id);

    if (!user) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "User Not Found" }));
    } else {
      await remove(id);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: `User ${id} removed` }));
    }
  } catch (error) {
    console.log(error);
  }
}
module.exports = { deleteUser };
