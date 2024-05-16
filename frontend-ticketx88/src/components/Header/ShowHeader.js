import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/Header.css";

const ShowHeader = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isTyping && searchTerm !== "") {
        fetchResults();
      }
    }, 5000); // 5000ms delay

    return () => clearTimeout(timer);
  }, [searchTerm, isTyping]);

  const fetchResults = async () => {
    const response = await fetch(
      `http://localhost:8888/api/event/search?q=${searchTerm}`
    );
    const data = await response.json();
    setResults(data);
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    setIsTyping(true);
  };

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
            value={searchTerm}
            onChange={handleInputChange}
          />
          {results.length > 0 && (
            <ul>
              {results.map((result, index) => (
                <li key={index}>{result.EventName}</li>
              ))}
            </ul>
          )}
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