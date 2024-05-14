import React, { useState } from "react";
import "../../styles/CodeInput.css";

function CodeInput() {
  const [code, setCode] = useState("");

  const handleInputChange = (event) => {
    setCode(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can handle the submitted code
    console.log(`Submitted code: ${code}`);
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
    </div>
  );
}

export default CodeInput;
