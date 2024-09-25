const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const uploadRoutes = require("./routes/upload");
const authRoutes = require("./routes/auth");
const summaryRoutes = require("./routes/summary");
const numrepos = require("./routes/repos");
const home = require("./routes/home");
const cors = require("cors");
const app = express();
const PORT = 8080;
app.use(cors());
app.use(express.json());
app.use("/", home);
app.use("/home", (req, res) => {
  res.send("This is Home Page for API calls");
});
app.use("/auth", authRoutes);
app.use("/upload", uploadRoutes);
app.use("/summary", summaryRoutes);
app.use("/repos", numrepos);

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DB Connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

connectToDB();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
