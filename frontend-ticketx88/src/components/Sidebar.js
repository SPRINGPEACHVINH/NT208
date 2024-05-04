import React from "react";
import "../styles/Sidebar.css";

function Sidebar() {
  return (
    <div className="container-sidebar">
      <div className="top-bar">
        <a href="index.html">
          <img
            src={require("../assets/images/favicon.png")}
            width="35px"
            height="35px"
            alt="Logo"
          />
        </a>
        <div className="profile-name">
          <p className="text" style={{ marginRight: "10px" }}>
            LeTien
          </p>
          <img
            src={require("../assets/images/icon.jpg")}
            width="45px"
            height="45px"
            style={{ borderRadius: "50%" }}
            alt="Profile"
          />
        </div>
      </div>

      <div className="sidebar">
        <ul>
          <a href="btc_register.html" style={{ textDecoration: "none" }}>
            <li>
              <span className="i-human"></span>
              Hồ sơ ban tổ chức
              <div className="li-overlay"></div>
            </li>
          </a>

          <a href="web2.html" style={{ textDecoration: "none" }}>
            <li>
              <span className="i-calendar"></span>
              Sự kiện đã tạo
              <div className="li-overlay"></div>
            </li>
          </a>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
