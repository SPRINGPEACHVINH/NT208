import React, { useState, useEffect } from "react";
import Form from "./Form.js";
import Sidebar from "./Sidebar.js";
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

  return (
    <div className="row">
      <HeaderBtcRegister
        handleSidebar={handleSidebar}
        isSidebarOpen={isSidebarOpen}
      />

      <div className="row-1">
        <div
          className={
            isMobile && isSidebarOpen
              ? "col-md-3-mobile"
              : isSidebarOpen
              ? "col-md-3"
              : "col-md-3-hidden"
          }
        >
          <Sidebar isSidebarOpen={isSidebarOpen} />
        </div>
        <div
          className={
            isMobile && isSidebarOpen
              ? "col-md-9-mobile"
              : isSidebarOpen
              ? "col-md-9"
              : "col-md-9-full"
          }
        >
          <Form isMobile={isMobile} />
        </div>
      </div>
    </div>
  );
};

export default BtcRegister;
