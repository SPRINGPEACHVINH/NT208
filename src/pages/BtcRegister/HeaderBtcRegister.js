import { Link } from "react-router-dom";
import "../../styles/HeaderBtcRegister.css";
import React from "react";
import { useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";

const SquareMenu = ({ handleSidebar, isSidebarOpen }) => {
  const [Icon, setIcon] = useState(null);

  React.useEffect(() => {
    if (isSidebarOpen) {
      import("@ant-design/icons/es/icons/MenuUnfoldOutlined").then((module) => {
        setIcon(module.default);
      });
    } else {
      import("@ant-design/icons/es/icons/MenuFoldOutlined").then((module) => {
        setIcon(module.default);
      });
    }
  }, [isSidebarOpen]);

  if (!Icon) return null;

  return (
    <button className="square-menu" onClick={handleSidebar}>
      <Icon className="icon-menu" />
    </button>
  );
};
const HeaderBtcRegister = ({ username, handleSidebar, isSidebarOpen }) => {
  return (
    <div className="header-btc-register">
      <SquareMenu handleSidebar={handleSidebar} isSidebarOpen={isSidebarOpen} />
      <Link className="title-logo" to="/">
        TicketX88
      </Link>
      <div className="user-name">
        <Avatar size="small" icon={<UserOutlined />} /> {username}
      </div>
    </div>
  );
};

export default HeaderBtcRegister;
