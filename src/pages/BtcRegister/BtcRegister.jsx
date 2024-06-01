import React, { useState, useEffect } from "react";
import Form from "./Form.js";
import Sidebar from "./Sidebar.js";
import MyEvents from "./MyEvents.js";
import HeaderBtcRegister from "./HeaderBtcRegister.js";
import "../../styles/BtcRegister.css";
import { useSelector } from "react-redux";

const BtcRegister = () => {
  const username = useSelector((state) => state.user.username);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
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

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(loadingTimer);
  }, []);

  return (
    <div className="container-form">
      <HeaderBtcRegister
        username={username}
        handleSidebar={handleSidebar}
        isSidebarOpen={isSidebarOpen}
      />
      <div className="row">
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
                  <Form username={username} isMobile={isMobile} />
                ) : (
                  <MyEvents username={username} isMobile={isMobile} />
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BtcRegister;
