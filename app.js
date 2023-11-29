const http = require("http");
const fs = require("fs");
const { createUser, currentUser } = require("./APIs/createUser.js");
const { readUser } = require("./APIs/readUser.js");
const { deleteUser } = require("./APIs/deleteUser.js");
const { updateUser } = require("./APIs/updateUser.js");

const login = fs.readFileSync("./Template/logged_in.html", "utf-8");
const update = fs.readFileSync("./Template/update.html", "utf-8");

const signed_in = false;
const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true"); // Allow cookies and credentials (if needed)
  let path = req.url;

  console.log(path, "path", req.method);
  if (req.method == "OPTIONS") {
    res.writeHead(200);
    res.end("");
  } else if (req.method === "POST" && path == "/login") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", async () => {
      body = JSON.parse(body);
      await createUser(body, res);
    });
  } else if (req.url.match(/\/user\/[0-9a-fA-F\-]+/)) {
    const id = req.url.split("/")[2];
    readUser(req, res, id);
  } else if (req.url.match(/\/details\/[0-9a-fA-F\-]+/)) {
    res.end(login);
  } else if (req.url.match(/\/delete\/[0-9a-fA-F\-]+/)) {
    const id = req.url.split("/")[2];
    console.log(id, "id");
    deleteUser(req, res, id);
  } else if (req.url.match(/\/update\/[0-9a-fA-F\-]+/) && req.method == "GET") {
    res.end(update);
  } else if (
    req.url.match(/\/update\/[0-9a-fA-F\-]+/) &&
    req.method == "POST"
  ) {
    const id = req.url.split("/")[2];
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", async () => {
      body = JSON.parse(body);
      await updateUser(req, res, id, body);
    });
  } else {
    res.writeHead(404);
    res.end("Error 404: Page not found");
  }

  console.log("A new request received");
});
server.listen(8000, "127.0.0.1", () => {
  console.log("Server has started");
});
