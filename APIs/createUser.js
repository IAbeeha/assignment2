let users = require("../users");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

function writeDataToFile(filename, content) {
  fs.writeFileSync(filename, JSON.stringify(content), "utf8");
}

let currentUser;
function create(user) {
  return new Promise((resolve, reject) => {
    const newUser = { id: uuidv4(), ...user };
    users.push(newUser);
    currentUser = newUser;
    if (process.env.NODE_ENV !== "test") {
      writeDataToFile("users.json", users);
    }
    resolve(newUser);
  });
}
async function createUser(body, res) {
  try {
    console.log(body, "create");
    const { name, password } = body;

    const user = {
      name,
      password,
    };

    const newUser = await create(user);

    res.writeHead(201, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
  }
}
module.exports = { createUser, currentUser };
