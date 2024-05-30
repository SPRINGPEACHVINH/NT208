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
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, []);

  return (
    <div className="row">
      {isLoading ? (
        <HeaderBtcRegister
          handleSidebar={handleSidebar}
          isSidebarOpen={isSidebarOpen}
        />
      ) : (
        <>
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
                isMobile={isMobile}
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
        </>
      )}
    </div>
  );
};

export default BtcRegister;
