const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.render("index");
});

app.get("/jobs", function (req, res) {
  const filePath = path.join(__dirname, "data", "jobs.json");
  const fileData = fs.readFileSync(filePath);
  const postedJobs = JSON.parse(fileData);
  res.render("browse", { jobs: postedJobs, numberOfJobs: postedJobs.length });
});

app.get("/jobs/:id", function (req, res) {
  const jobId = req.params.id;
  res.render("job-detail", { id: jobId });
});

app.get("/post", function (req, res) {
  res.render("post");
});

app.post("/post", function (req, res) {
  const job = req.body;
  const filePath = path.join(__dirname, "data", "jobs.json");
  const fileData = fs.readFileSync(filePath);
  const postedJobs = JSON.parse(fileData);
  postedJobs.push(job);
  fs.writeFileSync(filePath, JSON.stringify(postedJobs));

  res.redirect("/confirm");
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.get("/confirm", function (req, res) {
  res.render("confirm");
});

app.listen(3000);
