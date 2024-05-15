import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Header.css";

const ShowHeader = () => {
  return (
    <header className="header">
      <div className="logo">TicketX88</div>
      <div className="options">
        <div className="search-container">
          <input
            type="text"
            id="search-input"
            placeholder="Bạn tìm gì hôm nay?"
            autoComplete="off"
          />
          <button id="search-btn">Tìm kiếm</button>
        </div>
        <div className="actions">
          <button className="create-event">Tạo sự kiện</button>
          <button className="purchased-tickets">Vé đã mua</button>
          <button className="auth-button">
            <Link to="/Register">Đăng ký | Đăng nhập</Link>
          </button>
        </div>
      </div>
    </header>
  );
};

export default ShowHeader;
