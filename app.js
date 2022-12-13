const express = require("express");
const path = require("path");

const app = express();

app.get("/", function (req, res) {
  const htmlFilePath = path.join(__dirname, "views", "index.html");
  res.sendFile(htmlFilePath);
});

app.get("/jobs", function (req, res) {
  const htmlFilePath = path.join(__dirname, "views", "browse.html");
  res.sendFile(htmlFilePath);
});
app.listen(3000);
