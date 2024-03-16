import React, { useState } from "react";
import { useGlobalState } from "../Context/authctx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import classes from "../Styles/login.module.css";

const Login = () => {
  const [state, dispatch] = useGlobalState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        username,
        password,
      });
      const token = response.data.token;

      // Save token to localStorage or use it as needed for authentication
      localStorage.setItem("token", token);

      // Retrieve user's email from the authentication response
      const email = response.data.email;

      // Store the user's email in local storage
      localStorage.setItem("email", email);

      // Dispatch login action
      dispatch({ type: "LOGIN_SUCCESS" });

      // Redirect to the dashboard page after successful login
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <div className={classes.container}>
      <form onSubmit={handleLogin} className={classes.form}>
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
        <button type="submit" className={classes.btn}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
