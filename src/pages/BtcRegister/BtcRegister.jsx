import React, { useState, useEffect } from "react";
import Form from "./Form.js";
import Sidebar from "./Sidebar.js";
import MyEvents from "./MyEvents.js";
import HeaderBtcRegister from "./HeaderBtcRegister.js";
import "../../styles/BtcRegister.css";
import { useLocation } from "react-router-dom";

const BtcRegister = () => {
  // Thiết lập lắng nghe sự kiện resize window để kiểm tra chế độ xem
  useEffect(() => {
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);
  // Hàm để kiểm tra xem trên điện thoại hay không
  const [isMobile, setIsMobile] = useState(false);
  const checkMobile = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const handleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/CreateEvent") {
      setActiveTab("create-event");
    } else if (location.pathname === "/Events") {
      setActiveTab("my-events");
    }
  }, [location.pathname]);

  const [activeTab, setActiveTab] = useState(
    location.pathname === "/CreateEvent" ? "create-event" : "my-events"
  );
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (!isMobile && isSidebarOpen) {
      setIsSidebarOpen(true);
    } else if (!isMobile && !isSidebarOpen) {
      setIsSidebarOpen(false);
    } else if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const [events, setEvents] = useState([]);
  const addEvent = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  return (
    <div className="row">
      <HeaderBtcRegister
        handleSidebar={handleSidebar}
        isSidebarOpen={isSidebarOpen}
      />

      <div className="row-1">
        <div
          className={
            isMobile
              ? isSidebarOpen
                ? "col-md-3-mobile"
                : "col-md-3-hidden-mobile"
              : isSidebarOpen
              ? "col-md-3-desktop"
              : "col-md-3-hidden-desktop"
          }
        >
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            activeTab={activeTab}
            handleTabChange={handleTabChange}
          />
        </div>
        <div
          className={
            isMobile
              ? isSidebarOpen
                ? "col-md-9-hidden-mobile"
                : "col-md-9-mobile"
              : isSidebarOpen
              ? "col-md-9-desktop"
              : "col-md-9-hidden-desktop"
          }
        >
          {activeTab === "create-event" ? (
            <Form isMobile={isMobile} addEvent={addEvent} />
          ) : (
            <MyEvents isMobile={isMobile} events={events} />
          )}
        </div>
      </div>
    </div>
  );
};

export default BtcRegister;
