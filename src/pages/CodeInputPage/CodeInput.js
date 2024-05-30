import React, { useState } from "react";
import { message } from "antd";
import "../../styles/CodeInput.css";

function CodeInput() {
  const [code, setCode] = useState("");
  const [showVideo, setShowVideo] = useState(false);
  const [videoSrc, setVideoSrc] = useState("");

  const handleInputChange = (event) => {
    setCode(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userId = localStorage.getItem("username");

    if (!isLoggedIn || isLoggedIn === "false") {
      message.error("You must be logged in to view the video");
      return;
    }

    try {
      const response = await fetch(
        "https://ticketx88.azurewebsites.net/api/ticket/use-ticket",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            TicketId: code,
            UserId: userId,
          }),
        }
      );

      const data = await response.json();

      if (data.status === "ERROR") {
        throw new Error(data.message);
      }

      setVideoSrc(
        data.TicketPath || "https://www.youtube.com/embed/M-l5YImGpUE"
      );
      setShowVideo(true);
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <div className="code-input-container">
      {!showVideo ? (
        <form className="code-input-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={code}
            onChange={handleInputChange}
            placeholder="Enter your code here"
          />
          <button type="submit">Enter</button>
        </form>
      ) : (
        <div className="video-box">
          <iframe
            width="100%"
            height="100%"
            src={videoSrc}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      )}
    </div>
  );
}

export default CodeInput;
