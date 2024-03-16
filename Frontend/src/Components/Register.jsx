import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import classes from "../Styles/login.module.css";
import { useGlobalState } from "../Context/authctx";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [state, dispatch] = useGlobalState();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/auth/register", {
        username,
        password,
        email,
      });
      console.log("Registration successful:", response.data.message);
      setError(""); // Reset error state`

      // Store the user's email in local storage
      localStorage.setItem("email", email);

      // Dispatch login action
      dispatch({ type: "LOGIN" });

      // Redirect the user to the dashboard page after successful registration
      navigate("/");
    } catch (error) {
      console.error("Registration error:", error.response.data.message);
      setError(error.response.data.message); // Set error message
    }
  };

  return (
    <div className={classes.container}>
      <h2>Register</h2>
      <form onSubmit={handleRegister} className={classes.form}>
        {error && <div className={classes.error}>{error}</div>}{" "}
        {/* Display error message */}
        <label htmlFor="username" className={classes.lbl}>
          Username
        </label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className={classes.in}
        />
        <label htmlFor="password" className={classes.lbl}>
          Password
        </label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={classes.in}
        />
        <label htmlFor="email" className={classes.lbl}>
          Email
        </label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={classes.in}
        />
        <button type="submit" className={classes.btn}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
