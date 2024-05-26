import React from "react";
import "../../styles/RegisterBanner.css";

function Banner({ page }) {
  let text;
  if (page === "signup") {
    text = "Sign Up";
  } else if (page === "signin") {
    text = "Sign In";
  }

  return (
    <div className="register-banner">
      <span className="span-text">TicketX88 - {text}</span>
    </div>
  );
}

export default Banner;
