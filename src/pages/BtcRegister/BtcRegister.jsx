import React, { useState, useEffect } from "react";
import Form from "./Form.js";
import Sidebar from "./Sidebar.js";
import MyEvents from "./MyEvents.js";
import HeaderBtcRegister from "./HeaderBtcRegister.js";
import "../../styles/BtcRegister.css";

const BtcRegister = () => {
  // Thiết lập lắng nghe sự kiện resize window để kiểm tra chế độ xem
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
    setIsMobile(window.innerWidth <= 768);
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const handleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [activeTab, setActiveTab] = useState("create-event");
  const handleTabChange = (tab) => {
    setActiveTab(tab);
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
            <Form isMobile={isMobile} />
          ) : (
            <MyEvents isMobile={isMobile} />
          )}
        </div>
      </div>
    </div>
  );
};

export default BtcRegister;
