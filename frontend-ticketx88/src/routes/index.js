import MainMenu from "../pages/MainMenu/MainMenu";
import Btc_Register from "../pages/BtcRegister/BtcRegister";
import Decription from "../pages/Decription/Decription";
import Register from "../pages/Register/Register";

export const routes = [
  {
    path: "/",
    page: MainMenu,
  },
  {
    path: "/BtcRegister",
    page: Btc_Register,
  },
  {
    path: "/Decription",
    page: Decription,
  },
  {
    path: "/Register",
    page: Register,
  }
];
