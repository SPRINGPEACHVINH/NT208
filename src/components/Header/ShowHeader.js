import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logIn, logOut } from "../../redux/actions";
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
  var isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const username = useSelector((state) => state.user.username);
  const dispatch = useDispatch();

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const username = localStorage.getItem("username");
    if (isLoggedIn) {
      dispatch(logIn(username));
    }
  },[]);

  const handleLogOut = () => {
    dispatch(logOut());
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
  };
  const handleSearch = (event) => {
    event.preventDefault();
    navigate(`/SearchResult?q=${encodeURIComponent(searchTerm)}`);
    setSearchTerm("");
    document.getElementById("search-input").blur();
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

  return (
    <header className="header">
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
          {isLoggedIn && (
            <Link to="/CreateEvent">
              <button className="create-event">Tạo sự kiện</button>
            </Link>
          )}
          {isLoggedIn && (
            <button className="purchased-tickets">Vé đã mua</button>
          )}
          {isLoggedIn ? (
            <div className="user-dropdown" ref={dropdownRef}>
              <button
                className="user-button"
                onClick={() => setDropdownVisible(!dropdownVisible)}
              >
                {username}
              </button>
              {dropdownVisible && (
                <div
                  className={`user-dropdown-content ${
                    dropdownVisible ? "show" : ""
                  }`}
                >
                  <button onClick={handleLogOut}>Đăng xuất</button>
                </div>
              )}
            </div>
          ) : (
            <button className="auth-button">
              <Link to="/SignUp">Đăng ký | Đăng nhập</Link>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default ShowHeader;
