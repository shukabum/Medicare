import React, { useState, useEffect } from "react";
import classes from "../Styles/notification.module.css";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const healthNotifications = [
      "Your appointment with Dr. Smith is scheduled for tomorrow at 10:00 AM.",
      "Reminder: Take your medication at 12:00 PM.",
      "Don't forget to drink enough water throughout the day.",
      "Your blood pressure reading today is higher than usual. Take precautions.",
    ];

    // Function to get three random indices
    const getRandomIndices = () => {
      const indices = [];
      while (indices.length < 3) {
        const randomIndex = Math.floor(Math.random() * healthNotifications.length);
        if (!indices.includes(randomIndex)) {
          indices.push(randomIndex);
        }
      }
      return indices;
    };

    // Get three random notifications
    const randomIndices = getRandomIndices();
    const randomNotifications = randomIndices.map(index => ({
      id: Math.random().toString(36).substr(2, 9),
      message: healthNotifications[index],
      type: "health",
      timestamp: new Date().toLocaleString(),
    }));

    setNotifications(randomNotifications);
  }, []);
  return (
    <div className={classes.container}>
      <h2>Notifications</h2>
      <div className={classes.notificationList}>
        {notifications.map((notification) => (
          <div key={notification.id} className={classes.notificationItem}>
            <div className={classes.notificationMessage}>
              {notification.message}
            </div>
            <div className={classes.notificationType}>{notification.type}</div>
            <div className={classes.notificationTimestamp}>
              {notification.timestamp}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;
