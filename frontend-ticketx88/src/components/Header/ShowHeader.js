import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/Header.css";
import moment from "moment";

const ShowHeader = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isTyping && searchTerm !== "") {
        fetchResults();
      } else if (searchTerm === "") {
        setResults([]);
      }
    }, 100); // 250ms delay

    return () => clearTimeout(timer);
  }, [searchTerm, isTyping]);

  const fetchResults = async () => {
    const response = await fetch(
      `http://localhost:8881/api/event/search?q=${encodeURIComponent(
        searchTerm
      )}`
    );
    const data = await response.json();
    setResults(data.data);
    setIsTyping(false);
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
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <button id="search-btn">Tìm kiếm</button>
          {isFocused && results.length > 0 && (
            <div className="dropdown">
              <ul>
                {results.map((result, index) => (
                  <li key={index}>
                    <img
                      src={result.Picture_event}
                      alt={result.EventName}
                      className="event-image"
                    />
                    <div className="event-info">
                      <div className="event-name">{result.EventName}</div>
                      <div className="event-time-location">
                        {moment(result.EventTime).format("DD/MM/YYYY - HH:mm")}{" "}
                        ở {result.EventLocation}
                      </div>
                      <div className="event-price-category">
                        <span className="ticket-price">
                          Chỉ từ: {result.TicketPrice}
                        </span>
                        <span className="event-category">
                          {result.EventCategory}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="actions">
          <button className="create-event">
            <Link to="/BtcRegister">Tạo sự kiện</Link>
          </button>
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
