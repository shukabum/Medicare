import React, { useState } from "react";
import classes from "../Styles/company.module.css";
import profilepng from "../Assests/avatar.png";
import { faker } from "@faker-js/faker";
import { useGlobalState } from "../Context/authctx";
import Age from "../Assests/age.png";
import Bg from "../Assests/bg.png";
import Blood from "../Assests/blood.png";
import temp from "../Assests/temp.png";
import heart from "../Assests/heart.png";
import { FaClock, FaPager, FaTimes } from "react-icons/fa";
const Profile = () => {
  let tracdat = [];
  const [data, setdata] = useState(tracdat);

  const age = faker.number.int({ min: 15, max: 80 });
  const bloodPressure = `${faker.number.int({
    min: 90,
    max: 150,
  })} / ${faker.number.int({ min: 60, max: 100 })}`;
  const cholesterol = faker.number.int({ min: 120, max: 300 });
  const bloodGroup = faker.helpers.arrayElement(["A", "B", "AB", "O"]);
  const heartbeat = faker.number.int({ min: 60, max: 100 });
  const [state, dispatch] = useGlobalState();
  return (
    <div className={classes.profile}>
      <div className={classes.profileimage}>
        <img src={profilepng} className={classes.avatar} alt="Profile" />
        {localStorage.getItem("email")}
      </div>
      <div className={classes.healthSection}>
        <h3>Health Section</h3>
        <p
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "1.3rem",
            justifyContent: "space-evenly",
          }}
        >
          <img src={Age} /> &nbsp; Age: {age}
        </p>
        <p
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "1.3rem",
            justifyContent: "space-evenly",
          }}
        >
          <img src={Blood} /> &nbsp;BP: {bloodPressure}
        </p>
        <p
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "1.3rem",
            justifyContent: "space-evenly",
          }}
        >
          <img src={temp} />
          Cls: {cholesterol}
        </p>
        <p
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "1.3rem",
            justifyContent: "space-evenly",
          }}
        >
          <img src={Bg} /> &nbsp;BG: {bloodGroup}+
        </p>
        <p
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "1.3rem",
            justifyContent: "space-evenly",
          }}
        >
          <img src={heart} />
          HR: {heartbeat}
        </p>
      </div>
    </div>
  );
};

export default Profile;
