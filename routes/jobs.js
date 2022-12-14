const express = require("express");
const fs = require("fs");
const path = require("path");
const uuid = require("uuid");

const router = express.Router();

router.get("/jobs", function (req, res) {
  const filePath = path.join(__dirname, "..", "data", "jobs.json");
  const fileData = fs.readFileSync(filePath);
  const postedJobs = JSON.parse(fileData);
  res.render("browse", { jobs: postedJobs, numberOfJobs: postedJobs.length });
});

router.get("/jobs/:id", function (req, res) {
  const jobId = req.params.id;
  const filePath = path.join(__dirname, "..", "data", "jobs.json");
  const fileData = fs.readFileSync(filePath);
  const postedJobs = JSON.parse(fileData);

  for (const job of postedJobs) {
    if (job.id === jobId) {
      return res.render("job-detail", { job: job });
    }
  }

  res.status(404).render("404");
});

router.get("/post", function (req, res) {
  res.render("post");
});

router.post("/post", function (req, res) {
  const job = req.body;
  job.id = uuid.v4();
  const filePath = path.join(__dirname, "data", "jobs.json");
  const fileData = fs.readFileSync(filePath);
  const postedJobs = JSON.parse(fileData);
  postedJobs.push(job);
  fs.writeFileSync(filePath, JSON.stringify(postedJobs));

  res.redirect("/confirm");
});

module.exports = router;
