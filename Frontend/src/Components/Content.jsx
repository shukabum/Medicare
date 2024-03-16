import React, { useState, useEffect } from "react";
import classes from "../Styles/content.module.css";
import SearchFilter from "./SearchFilter";
import axios from "axios";
const Content = () => {
  const [summary, setSummary] = useState([]);
  const [lastSummaryPoints, setLastSummaryPoints] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/summary", {
        params: {
          filename: localStorage.getItem("filename"),
        },
      })
      .then((response) => {
        setSummary(response.data);
        if (response.data.length > 0) {
          const lastSummary = response.data[0];
          const points = lastSummary.split(". ");
          setLastSummaryPoints(points);
        }
      })
      .catch((error) => {
        console.error("Error fetching summary:", error);
      });
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.nav}>
        Dashboard
        <SearchFilter />
      </div>
      <div className={classes.summaries}>
        <h3>Latest Report Summary: </h3>

        {lastSummaryPoints.length > 0 ? (
          <ul
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              fontSize: "1.2rem",
              fontWeight: "400",
            }}
          >
            {lastSummaryPoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
};

export default Content;
