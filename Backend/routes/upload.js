const express = require("express");
const multer = require("multer");
const fs = require("fs");
const axios = require("axios");
const mongoose = require("mongoose");
const Report = require("../models/Report");

const router = express.Router();
const upload = multer({ dest: "/tmp/uploads/" });
router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ message: "No file data uploaded" });

    const filename = req.file.originalname;
    console.log(req.file.originalname);
    // const fileDataPath = req.file.path;
    const fileData = req.file.path;
    const { email } = req.body;
    let summary = "";
    const newReport = new Report({
      filename: filename,
      fileData: "",
      summary: summary,
      email: email,
    });

    await newReport.save();

    const flaskEndpoint = "http://127.0.0.1:5000/upload";
    const response = await axios.post(flaskEndpoint, {
      filename: filename,
      fileData: fileData,
    });

    summary = response.data.summary;

    await Report.findOneAndUpdate({ filename: filename }, { summary: summary });

    res.json({
      message: "File uploaded successfully",
      filename: filename,
      summary: summary,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
