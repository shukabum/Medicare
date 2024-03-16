import classes from "./Styles/app.module.css";
import Leftbar from "./Components/Leftbar";
import Content from "./Components/Content";
import Profile from "./Components/Profile";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Contact from "./Components/Contact";
import Info from "./Components/Info";
import Noti from "./Components/Noti";
import Login from "./Components/Login";
import { GlobalStateProvider, useGlobalState } from "./Context/authctx";
import { useEffect } from "react";
import ReportUpload from "./Components/Lab/ReportUplaod";
import Register from "./Components/Register";
import ChatBot from "./Components/Lab/ChatBot";

function App() {
  const [state, dispatch] = useGlobalState();

  useEffect(() => {
    // Check if the user is logged in from local storage
    const storedLogin = localStorage.getItem("login");
    if (storedLogin === "true") {
      dispatch({ type: "LOGIN" });
    }
  }, []);
  useEffect(() => {
    // Update local storage when the login state changes
    localStorage.setItem("login", state.log ? "true" : "false");
  }, [state.log]);

  return (
    <div className={classes.container}>
      {state.log ? (
        <>
          <Leftbar />
          <Routes>
            <Route path="/" element={<Content />} />
            <Route path="/notifications" element={<Noti />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/info" element={<Info />} />
            <Route path="/login" element={<Login />} />
            <Route path="/upload-report" element={<ReportUpload />} />
            <Route path="/chatbot" element={<ChatBot />} />
          </Routes>
          <Profile />
        </>
      ) : (
        <Routes>
          <Route path="/" element={<Register />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
