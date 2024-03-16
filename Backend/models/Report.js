const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  filename: String,
  fileData: Buffer, // Store file data as Buffer
  summary: String,
  userEmail: String,
});

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;
