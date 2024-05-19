import React, { useState } from "react";
import Form from "./Form.js";
import Sidebar from "./Sidebar.js";
import HeaderBtcRegister from "./HeaderBtcRegister.js";
import "../../styles/BtcRegister.css";

const BtcRegister = () => {
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
        <div className={isSidebarOpen ? "col-md-3" : "col-md-3-hidden"}>
          <Sidebar isSidebarOpen={isSidebarOpen} />
        </div>
        <div className={isSidebarOpen ? "col-md-9" : "col-md-9-full"}>
          <Form />
        </div>
      </div>
    </div>
  );
};

export default BtcRegister;
