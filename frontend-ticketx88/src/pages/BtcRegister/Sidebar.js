import "../../styles/Sidebar.css";
import { useState } from "react";

function Sidebar() {
  const [activeItem, setActiveItem] = useState("my-event"); // Khởi tạo mục đang được chọn

  return (
    <div className="container-sidebar-hidden">
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

      <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark container-sidebar">
        <div className="dropdown">
          <a
            href="#"
            className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src={require("../../assets/images/icon.jpg")}
              alt=""
              width="32"
              height="32"
              className="rounded-circle me-2"
            />
            <strong>mdo</strong>
          </a>
          <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
            <li>
              <a className="dropdown-item" href="index.html">
                Settings
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="index.html">
                Profile
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item" href="index.html">
                Sign out
              </a>
            </li>
          </ul>
        </div>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <a
              href="index.html"
              className={`text-white nav-link ${
                activeItem === "my-event" && "active"
              }`}
              aria-current="page"
              onClick={() => setActiveItem("my-event")}
            >
              <svg className="bi pe-none me-2" width="16" height="16">
                <use href="#my-event" />
              </svg>
              Sự kiện đã tạo
            </a>
          </li>
          <li>
            <a
              href="#"
              className={`text-white nav-link ${
                activeItem === "create-event" && "active"
              }`}
              onClick={() => setActiveItem("create-event")}
            >
              <svg className="bi pe-none me-2" width="16" height="16">
                <use href="#create-event" />
              </svg>
              Tạo sự kiện
            </a>
          </li>
        </ul>
        <hr />
      </div>
    </div>
  );
}

export default Sidebar;
