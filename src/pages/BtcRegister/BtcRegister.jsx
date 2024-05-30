import React, { useState, useEffect } from "react";
import Form from "./Form.js";
import Sidebar from "./Sidebar.js";
import MyEvents from "./MyEvents.js";
import HeaderBtcRegister from "./HeaderBtcRegister.js";
import "../../styles/BtcRegister.css";

const BtcRegister = () => {
  const [isMobile, setIsMobile] = useState(false);
  const checkMobile = () => {
    setIsMobile(window.innerWidth <= 768);
  };
  useEffect(() => {
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const handleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const getInitialTab = () => {
    return localStorage.getItem("activeTab") || "my-event";
  };
  const [activeTab, setActiveTab] = useState(getInitialTab);
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    localStorage.setItem("activeTab", tab);

    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const [events, setEvents] = useState([]);
  const addEvent = (newEvent) => {
    setEvents((events) => [...events, newEvent]);
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(loadingTimer);
  }, []);

  return (
    <div className="row">
      <HeaderBtcRegister
        handleSidebar={handleSidebar}
        isSidebarOpen={isSidebarOpen}
      />
      <div className="row-1">
        {!isLoading && (
          <>
            <div
              className={`col-md-3-${
                isMobile
                  ? isSidebarOpen
                    ? "mobile"
                    : "hidden-mobile"
                  : isSidebarOpen
                  ? "desktop"
                  : "hidden-desktop"
              }`}
            >
              <Sidebar
                isMobile={isMobile}
                isSidebarOpen={isSidebarOpen}
                activeTab={activeTab}
                handleTabChange={handleTabChange}
              />
            </div>
            <div
              className={`col-md-9-${
                isMobile
                  ? isSidebarOpen
                    ? "hidden-mobile"
                    : "mobile"
                  : isSidebarOpen
                  ? "desktop"
                  : "hidden-desktop"
              }`}
            >
              {activeTab === "create-event" ? (
                <Form isMobile={isMobile} addEvent={addEvent} />
              ) : (
                <MyEvents isMobile={isMobile} events={events} />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BtcRegister;
