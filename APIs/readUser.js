const { findById } = require("./util.js");

async function readUser(req, res, id) {
  try {
    const user = await findById(id);

    if (!user) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product Not Found" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      console.log(user.id);
      res.end(JSON.stringify(user));
    }
  } catch (error) {
    console.log(error);
  }
}
module.exports = { readUser };
