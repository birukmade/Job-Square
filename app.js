const express = require("express");
const path = require("path");

const app = express();

app.get("/", function (req, res) {
  const htmlFilePath = path.join(__dirname, "views", "index.html");
  res.sendFile(htmlFilePath);
});
app.listen(3000);
