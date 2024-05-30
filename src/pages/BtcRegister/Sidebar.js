import "../../styles/Sidebar.css";
import { Link, useLocation } from "react-router-dom";
import React, { useEffect } from "react";

function Sidebar({ isMobile, isSidebarOpen, activeTab, handleTabChange }) {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/CreateEvent") {
      if (isMobile && isSidebarOpen) {
        return;
      } else {
        handleTabChange("create-event");
      }
    } else if (location.pathname === "/Events") {
      if (isMobile && isSidebarOpen) {
        return;
      } else {
        handleTabChange("my-event");
      }
    }
  }, [location.pathname, isMobile, isSidebarOpen, handleTabChange]);

  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark ">
      <svg xmlns="http://www.w3.org/2000/svg" className="d-none">
        <symbol id="create-event" viewBox="0 0 16 16">
          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
          <path
            fill-rule="evenodd"
            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
          />
        </symbol>

        <symbol id="my-event" viewBox="0 0 16 16">
          <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z" />
          <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
        </symbol>
      </svg>
      {isSidebarOpen && (
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item-open">
            <Link
              to="/Events"
              className={`text-white nav-link ${
                activeTab === "my-event" && "active"
              }`}
              aria-current="page"
              onClick={() => handleTabChange("my-event")}
            >
              <svg className="bi pe-none me-2-open" width="16" height="16">
                <use href="#my-event" />
              </svg>
              Sự kiện đã tạo
            </Link>
          </li>
          <li className="nav-item-open">
            <Link
              to="/CreateEvent"
              className={`text-white nav-link ${
                activeTab === "create-event" && "active"
              }`}
              onClick={() => handleTabChange("create-event")}
            >
              <svg className="bi pe-none me-2-open" width="16" height="16">
                <use href="#create-event" />
              </svg>
              Tạo sự kiện
            </Link>
          </li>
        </ul>
      )}
      {!isSidebarOpen && (
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item-close">
            <Link
              to="/Events"
              className={`text-white nav-link ${
                activeTab === "my-event" && "active"
              }`}
              aria-current="page"
              onClick={() => handleTabChange("my-event")}
            >
              <svg className="bi pe-none me-2-close" width="16" height="16">
                <use href="#my-event" />
              </svg>
            </Link>
          </li>
          <li className="nav-item-close">
            <Link
              to="/CreateEvent"
              className={`text-white nav-link ${
                activeTab === "create-event" && "active"
              }`}
              onClick={() => handleTabChange("create-event")}
            >
              <svg className="bi pe-none me-2-close" width="16" height="16">
                <use href="#create-event" />
              </svg>
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}

export default Sidebar;
