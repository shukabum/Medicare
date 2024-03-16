import React, { useEffect, useState } from "react";
import axios from "axios";
import classes from "../../Styles/reportupload.module.css";

const ReportUpload = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);

  const handleFileUpload = async (event) => {
    try {
      setLoading(true);
      const files = event.target.files;
      const email = localStorage.getItem("email");
      const formData = new FormData();
      formData.append("file", files[0]);
      formData.append("email", email);
      console.log(event.target.files);

      const response = await axios.post(
        "http://localhost:8080/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      localStorage.setItem("filename", response.data.filename);

      console.log("Summary:", response.data.summary.result);
      setUploadedFiles(files);
      setError("");
    } catch (error) {
      console.error("Upload error:", error.response.data.message);
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/repos")
      .then((resp) => {
        // console.log(resp);
        setFiles(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [uploadedFiles]);
  return (
    <div className={classes.container}>
      <h2>Upload Reports</h2>

      <div
        className={classes.dropZone}
        onClick={() => document.querySelector('input[type="file"]').click()}
      >
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileUpload}
          placeholder="Upload PDFs here"
          style={{ display: "none", cursor: "pointer" }}
        />
      </div>

      <div className={classes.dropZoneContent}>
        {loading && <div className={classes.loader}>Loading...</div>}
        {error && <div className={classes.error}>{error}</div>}
        {summary && <div className={classes.summary}>{summary}</div>}
      </div>
      <div className={classes.reports}>
        {/* hello */}

        {files.map((f, i) => (
          <div className={classes.reportcard} key ={i}>{f}</div>
        ))}
      </div>
    </div>
  );
};

export default ReportUpload;
