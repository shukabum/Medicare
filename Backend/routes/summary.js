const express = require("express");
const router = express.Router();
const Report = require("../models/Report");

router.get("/", async (req, res) => {
  try {
    let file = req.query.filename;
    const reports = await Report.find({ filename: file });
    const summarizedData = reports.map((report) => report.summary);
    res.json(summarizedData);
  } catch (error) {
    console.error("Error retrieving summarized data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
