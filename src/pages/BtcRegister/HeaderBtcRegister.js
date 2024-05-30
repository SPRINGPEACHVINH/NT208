import { Link } from "react-router-dom";
import "../../styles/HeaderBtcRegister.css";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import React from "react";
const SquareMenu = ({ handleSidebar, isSidebarOpen }) => (
  <button className="square-menu" onClick={handleSidebar}>
    {isSidebarOpen ? (
      <MenuUnfoldOutlined className="icon-menu" />
    ) : (
      <MenuFoldOutlined className="icon-menu" />
    )}
  </button>
);

const HeaderBtcRegister = ({ handleSidebar, isSidebarOpen }) => {
  return (
    <header className="header-btc-register">
      <SquareMenu handleSidebar={handleSidebar} isSidebarOpen={isSidebarOpen} />
      <Link className="title-logo" to="/">
        TicketX88
      </Link>
    </header>
  );
};

export default HeaderBtcRegister;
