const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  const htmlFilePath = path.join(__dirname, "views", "index.html");
  res.sendFile(htmlFilePath);
});

app.get("/jobs", function (req, res) {
  const htmlFilePath = path.join(__dirname, "views", "browse.html");
  res.sendFile(htmlFilePath);
});

app.get("/post", function (req, res) {
  const htmlFilePath = path.join(__dirname, "views", "post.html");
  res.sendFile(htmlFilePath);
});

app.post("/post", function (req, res) {
  const job = req.body;
  console.log(job);
  const filePath = path.join(__dirname, "data", "jobs.json");
  const fileData = fs.readFileSync(filePath);
  const postedJobs = JSON.parse(fileData);
  postedJobs.push(job);
  fs.writeFileSync(filePath, JSON.stringify(postedJobs));

  res.redirect("/confirm");
});

app.get("/about", function (req, res) {
  const htmlFilePath = path.join(__dirname, "views", "about.html");
  res.sendFile(htmlFilePath);
});

app.get("/confirm", function (req, res) {
  const htmlFilePath = path.join(__dirname, "views", "confirm.html");
  res.sendFile(htmlFilePath);
});

app.listen(3000);
