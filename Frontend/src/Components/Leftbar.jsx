import React, { useState } from "react";
import classes from "../Styles/leftbar.module.css";
import {
  FaHome,
  FaBell,
  FaInfo,
  FaAddressBook,
  FaRoute,
  FaArrowRight,
  FaAnchor,
  FaLock,
  FaPagelines,
  FaPager,
  FaRobot,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { globalStateContext, useGlobalState } from "../Context/authctx";

const Modal = ({ isOpen, onClose, oncancel, children }) => {
  if (!isOpen) return null;
  return (
    <div className={classes.modal_overlay}>
      <div className={classes.modal_content}>
        {children}
        <div className={classes.buts}>
          <button
            className={classes.modal_close}
            onClick={onClose}
            style={{ color: "rgb(237, 79, 74);", fontSize: "1rem" }}
          >
            Logout
          </button>
          <button
            className={classes.modal_close}
            onClick={oncancel}
            style={{ color: "green", fontSize: "1rem" }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
const Leftbar = () => {
  const [state, dispatch] = useGlobalState();
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const route = useNavigate();
  const closeModal = () => {
    localStorage.removeItem("name");
    localStorage.setItem("login", false);
    dispatch({ type: "LOGOUT" });
    setModalOpen(false);
    route("/");
  };
  const cancel = () => {
    setModalOpen(false);
  };

  return (
    <div className={classes.container}>
      <NavLink
        to="/"
        activeClassName={`${classes.active} ${classes.activeNavLink}`}
      >
        <FaHome className={classes.active} />
      </NavLink>
      <NavLink
        to="/notifications"
        activeClassName={`${classes.active} ${classes.activeNavLink}`}
      >
        <FaBell className={classes.active} />
      </NavLink>
      <NavLink
        to="/upload-report"
        activeClassName={`${classes.active} ${classes.activeNavLink}`}
      >
        <FaPager className={classes.active} />
      </NavLink>
      <NavLink
        to="/info"
        activeClassName={`${classes.active} ${classes.activeNavLink}`}
      >
        <FaInfo className={classes.active} />
      </NavLink>
      <NavLink
        to="/contact"
        activeClassName={`${classes.active} ${classes.activeNavLink}`}
      >
        <FaAddressBook className={classes.active} />
      </NavLink>
      <NavLink
        to="/chatbot"
        activeClassName={`${classes.active} ${classes.activeNavLink}`}
      >
        <FaRobot className={classes.active} />
      </NavLink>
      <NavLink
        onClick={openModal}
        activeClassName={`${classes.active} ${classes.activeNavLink}`}
      >
        <FaLock className={classes.active} />
      </NavLink>
      <Modal isOpen={isModalOpen} onClose={closeModal} oncancel={cancel}>
        <h1>Are you sure? </h1>
      </Modal>
    </div>
  );
};

export default Leftbar;
