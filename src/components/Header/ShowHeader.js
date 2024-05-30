import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logIn, logOut } from "../../redux/actions";
import { Link } from "react-router-dom";
import "../../styles/Header.css";
import moment from "moment";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { googleLogout } from "@react-oauth/google";

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
  }, []);

  const handleLogOut = () => {
    if (localStorage.getItem("isGoogle") === "true") {
      handleGoogleLogOut();
    } else {
      handleNormalLogOut();
    }
  };

  const handleGoogleLogOut = () => {
    googleLogout()
    localStorage.setItem("isLoggedIn", "false");
    localStorage.removeItem("username");
    localStorage.setItem("isGoogle", "false");
    dispatch(logOut())
    navigate("/SignUp"); // Navigate to the home page after logging out
  };

  const handleNormalLogOut = () => {
    dispatch(logOut());
    localStorage.setItem("isLoggedIn", "false");
    localStorage.removeItem("username");
    navigate("/SignUp"); // Navigate to the home page after logging out
  };
  const handleSearch = (event) => {
    event.preventDefault();
    navigate(`/SearchResult?q=${encodeURIComponent(searchTerm)}`);
    setSearchTerm("");
    document.getElementById("search-input").blur();
  };

  const searchBehavior = (event) => {
    document
      .querySelector(".search-btn")
      .addEventListener("click", function () {
        this.parentElement.classList.toggle("open");
        this.previousElementSibling.focus();
      });
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
      `https://ticketx88.azurewebsites.net/api/event/search?q=${encodeURIComponent(
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
                        onClick={() =>
                          navigate(`/Description/${result.EventId}`)
                        }
                      >
                        <img
                          src={result.Picture_event}
                          alt={result.EventName}
                          className="event-image"
                        />
                        <div className="event-info">
                          <div className="event-name">{result.EventName}</div>
                          <div className="event-time-location">
                            {moment(result.EventTime).format(
                              "DD/MM/YYYY - HH:mm"
                            )}
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
                    <Avatar size="small" icon={<UserOutlined />} />  {username}
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
                  <Link to="/SignIn">Đăng nhập | Đăng ký</Link>
                </button>
              )}
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
                  placeholder="Search..."
                  autoComplete="off"
                  value={searchTerm}
                  onChange={handleInputChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
                <button class="search-btn" onFocus={searchBehavior}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    id="search-icon"
                  >
                    <path
                      d="M11 17a6 6 0 100-12 6 6 0 000 12zM18.5 18.5l-3-3"
                      stroke="#2A2D34"
                      stroke-width="2"
                      stroke-miterlimit="10"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                </button>
                {isFocused && results.length > 0 && (
                  <div className="dropdown">
                    <ul>
                      {results.map((result, index) => (
                        <li
                          key={index}
                          onClick={() =>
                            navigate(`/Description/${result.EventId}`)
                          }
                        >
                          <img
                            src={result.Picture_event}
                            alt={result.EventName}
                            className="event-image"
                          />
                          <div className="event-info">
                            <div className="event-name">{result.EventName}</div>
                            <div className="event-time-location">
                              {moment(result.EventTime).format(
                                "DD/MM/YYYY - HH:mm"
                              )}
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
              </form>
              <div className="actions">
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
                    <Link to="/SignIn">Đăng nhập</Link>
                  </button>
                )}
              </div>
            </div>
          </header>
        </div>
      )}
    </header>
  );
};

export default ShowHeader;
