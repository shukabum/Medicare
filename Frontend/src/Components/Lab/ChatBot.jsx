import React, { useState } from "react";
import "./chtbt.css";
import { FaGooglePay, FaGooglePlay, FaPushed } from "react-icons/fa";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleMessageSubmit = () => {
    if (input.trim() === "") return;
    setMessages([...messages, { text: input, sender: "user" }]);
    // Replace the botResponse function with your own logic to fetch responses from the backend or process them locally.
    botResponse(input);
    setInput("");
  };

  const botResponse = (input) => {
    // Example response from the bot
    const response = `You : ${input}`;
    setMessages([...messages, { text: response, sender: "bot" }]);
  };

  return (
    <div className="App">
      <div className="chat-container">
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              {message.text}
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleMessageSubmit();
              }
            }}
          />
          <button onClick={handleMessageSubmit}>
            <FaGooglePlay style={{ fontSize: "1.2rem" }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
