import MainMenu from "../pages/MainMenu/MainMenu";
import Btc_Register from "../pages/BtcRegister/BtcRegister";
import Decription from "../pages/Decription/Decription";
import Register from "../pages/Register/Register";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import CodeInputPage from "../pages/CodeInputPage/CodeInput";

export const routes = [
  {
    path: "/",
    page: MainMenu,
    isShowHeader: true,
  },
  {
    path: "/BtcRegister",
    page: Btc_Register,
    isShowHeader: true,
  },
  {
    path: "/Decription",
    page: Decription,
    isShowHeader: true,
  },
  {
    path: "/Register",
    page: Register,
    isShowHeader: true,
  },
  {
    path: "/code-input",
    page: CodeInputPage,
    isShowHeader: true,
  },
  {
    path: "*",
    page: NotFoundPage,
  },
];
