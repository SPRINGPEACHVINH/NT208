import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../styles/Header.css";
import moment from "moment";

const ShowHeader = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [blurTimeoutId, setBlurTimeoutId] = useState(null);

  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    navigate(`/SearchResult?q=${encodeURIComponent(searchTerm)}`);
    setSearchTerm("");
    document.getElementById("search-input").blur();
  };

  const searchBehavior = (event) => {
    document.querySelector('.search-btn').addEventListener('click', function () {
      this.parentElement.classList.toggle('open')
      this.previousElementSibling.focus()
    })
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isTyping && searchTerm !== "") {
        fetchResults();
      } else if (searchTerm === "") {
        setResults([]);
      }
    }, 250); // 250ms delay

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

  const handleBlur = () => {
    setBlurTimeoutId(
      setTimeout(() => {
        setIsFocused(false);
      }, 250)
    ); // 250ms delay
  };

  const handleFocus = () => {
    clearTimeout(blurTimeoutId);
    setIsFocused(true);
  };

  useEffect(() => {
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
        window.removeEventListener("resize", checkMobile);
    };
  });

  // Hàm để kiểm tra xem trên điện thoại hay không
  const [isMobile, setIsMobile] = useState(false);
  const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1251); // Định nghĩa ngưỡng chiều rộng cho điện thoại
  };

  return (
    <header className="header">
      {!isMobile && (
        <div className="desktop" style={{ display: "flex" }}>
          <div className="logo">
            <Link
              className="logo-link"
              to="/"
              onClick={() => {
                setSearchTerm("");
              }}
            >
              TicketX88
            </Link>
          </div>
          <div className="options">
            <div className="search-container">
              <form className="search-form" onSubmit={handleSearch}>
                <input
                  type="text"
                  id="search-input"
                  placeholder="Bạn tìm gì hôm nay?"
                  autoComplete="off"
                  value={searchTerm}
                  onChange={handleInputChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                <button id="search-btn" onClick={handleSearch}>
                  Tìm kiếm
                </button>
              </form>
              {isFocused && results.length > 0 && (
                <div className="dropdown">
                  <ul>
                    {results.map((result, index) => (
                      <li
                        key={index}
                        onClick={() => navigate(`/Description/${result.EventId}`)}
                      >
                        <img
                          src={result.Picture_event}
                          alt={result.EventName}
                          className="event-image"
                        />
                        <div className="event-info">
                          <div className="event-name">{result.EventName}</div>
                          <div className="event-time-location">
                            {moment(result.EventTime).format("DD/MM/YYYY - HH:mm")}ở{" "}
                            {result.EventLocation}
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
              <Link to="/CreateEvent">
                <button className="create-event">Tạo sự kiện</button>
              </Link>
              <button className="purchased-tickets">Vé đã mua</button>
              <button className="auth-button">
                <Link to="/SignUp">Đăng ký | Đăng nhập</Link>
              </button>
            </div>
          </div>
        </div>
      )}
      {isMobile && (
        <div className="mobile" style={{ display: "flex" }}>
          <header class="wrapper">
            <div className="logo">
              <Link
                className="logo-link"
                to="/"
                onClick={() => {
                  setSearchTerm("");
                }}
              >
                TicketX88
              </Link>
            </div>
            <div class="content-col" id="other-content">
              <form class="search-box" onSubmit={handleSearch}>
                <input
                  type="text"
                  id="search-input"
                  placeholder="Bạn tìm gì hôm nay?"
                  autoComplete="off"
                  value={searchTerm}
                  onChange={handleInputChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                <button class="search-btn" onFocus={searchBehavior}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" id="search-icon"><path d="M11 17a6 6 0 100-12 6 6 0 000 12zM18.5 18.5l-3-3" stroke="#2A2D34" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                  </svg>  
                </button>
                {isFocused && results.length > 0 && (
                  <div className="dropdown">
                    <ul>
                      {results.map((result, index) => (
                        <li
                          key={index}
                          onClick={() => navigate(`/Description/${result.EventId}`)}
                        >
                          <img
                            src={result.Picture_event}
                            alt={result.EventName}
                            className="event-image"
                          />
                          <div className="event-info">
                            <div className="event-name">{result.EventName}</div>
                            <div className="event-time-location">
                              {moment(result.EventTime).format("DD/MM/YYYY - HH:mm")}ở{" "}
                              {result.EventLocation}
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
              </form>
              <div class="signin">
                <div class="link sign-in">
                  <a href="/SignUp">Đăng nhập</a>
                </div>
              </div>
            </div>
          </header>
        </div>
      )}
    </header>
  );
};

export default ShowHeader;
