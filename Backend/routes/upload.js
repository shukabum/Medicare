const express = require("express");
const multer = require("multer");
const fs = require("fs");
const axios = require("axios");
const mongoose = require("mongoose");
const Report = require("../models/Report");
const upload = multer({ dest: "/tmp/uploads/" });
const router = express.Router();
router.post("/",  upload.single("file"),async (req, res) => {
  try {
    console.log(req);
    if (!req.file)
      return res.status(400).json({ message: "No file data uploaded" });

    const filename = req.file.originalname;
    const fileType = req.file.mimetype;
    // const fileDataPath = req.file.path;
    const fileDataPath = req.file.path;
    console.log("hello");
    console.log(fileDataPath);
    const fileData = await fs.readFile(fileDataPath);
    const { email } = req.body;
    let summary = "";
    const newReport = new Report({
      filename: filename,
      fileData: fileData,
      fileType: fileType,
      summary: summary,
      email: email,
    });

    await newReport.save();

    const flaskEndpoint = "http://127.0.0.1:5000/upload";
    const response = await axios.post(flaskEndpoint, {
      filename: filename,
      fileData: fileData.toString('base64'),
    });

    summary = response.data.summary;

    await Report.findOneAndUpdate({ _id: newReport._id }, { summary: summary });

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
