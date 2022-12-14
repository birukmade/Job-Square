const express = require("express");
const path = require("path");
const fs = require("fs");
const uuid = require("uuid");

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
  const filePath = path.join(__dirname, "data", "jobs.json");
  const fileData = fs.readFileSync(filePath);
  const postedJobs = JSON.parse(fileData);

  for (const job of postedJobs) {
    if (job.id === jobId) {
      return res.render("job-detail", { job: job });
    }
  }

  res.status(404).render("404");
});

app.get("/post", function (req, res) {
  res.render("post");
});

app.post("/post", function (req, res) {
  const job = req.body;
  job.id = uuid.v4();
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

app.use(function (req, res) {
  res.status(404).render("404");
});

app.use(function (error, req, res, next) {
  res.status(500).render("500");
});
app.listen(3000);
