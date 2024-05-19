import { Link } from "react-router-dom";
import "../../styles/HeaderBtcRegister.css";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

const SquareMenu = ({ handleSidebar, isSidebarOpen }) => (
  <button className="square-menu" onClick={handleSidebar}>
    {isSidebarOpen ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
  </button>
);

const HeaderBtcRegister = ({ handleSidebar, isSidebarOpen }) => {
  return (
    <header className="header-btc-register">
      <SquareMenu handleSidebar={handleSidebar} isSidebarOpen={isSidebarOpen} />
      <Link className="title-logo">TicketX88</Link>
    </header>
  );
};

export default HeaderBtcRegister;
