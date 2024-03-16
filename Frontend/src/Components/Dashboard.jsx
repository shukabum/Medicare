import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [summary, setSummary] = useState("");

  useEffect(() => {
    // Make a GET request to fetch the summarized text from the backend
    axios
      .get("http://localhost:8080/summary")
      .then((response) => {
        setSummary(response.data);
      })
      .catch((error) => {
        console.error("Error fetching summary:", error);
      });
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <div>
      <h3>Summarized Texts:</h3>
        <ul>
          {summaries.map((summary, index) => (
            <li key={index}>{summary}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
