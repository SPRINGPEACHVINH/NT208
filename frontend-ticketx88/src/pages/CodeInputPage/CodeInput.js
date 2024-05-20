import React, { useState } from "react";
import "../../styles/CodeInput.css";

function CodeInput() {
  const [code, setCode] = useState("");
  const [showVideo, setShowVideo] = useState(false);

  const handleInputChange = (event) => {
    setCode(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Submitted code: ${code}`);
    setShowVideo(true);
  };

  return (
    <div className="code-input-container">
      <form className="code-input-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={code}
          onChange={handleInputChange}
          placeholder="Enter your code here"
        />
        <button type="submit">Enter</button>
      </form>
      {showVideo && (
        <div className="video-box">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/M-l5YImGpUE"
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
