import MainMenu from "../pages/MainMenu/MainMenu";
import Btc_Register from "../pages/BtcRegister/BtcRegister";
import Description from "../pages/Description/Description.jsx";
import Register from "../pages/Register/Register.jsx";
import SignIn from "../pages/Register/SignIn.jsx";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import CodeInputPage from "../pages/CodeInputPage/CodeInput";
import SearchResult from "../pages/SearchResult/ShowResult";

export const routes = [
  {
    path: "/",
    page: MainMenu,
    isShowHeader: true,
    isShowFooter: true,
  },
  {
    path: "/BtcRegister",
    page: Btc_Register,
    isShowHeader: false,
    isShowFooter: false,
  },
  {
    path: "/Description/:eventId",
    page: Description,
    isShowHeader: true,
    isShowFooter: true,
  },
  {
    path: "/Register",
    page: Register,
    isShowHeader: false,
    isShowFooter: true,
  },
  {
    path: "/SignIn",
    page: SignIn,
    isShowHeader: false,
  },
  {
    path: "/code-input",
    page: CodeInputPage,
    isShowHeader: true,
  },
  {
    path: "/SearchResult",
    page: SearchResult,
    isShowHeader: true,
    isShowFooter: true,
  },
  {
    path: "*",
    page: NotFoundPage,
  },
];
