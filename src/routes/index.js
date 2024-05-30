import MainMenu from "../pages/MainMenu/MainMenu";
import Btc_Register from "../pages/BtcRegister/BtcRegister";
import Description from "../pages/Description/Description.jsx";
import SignUp from "../pages/Register/SignUp.jsx";
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
    path: "/CreateEvent",
    page: Btc_Register,
    isShowHeader: false,
    isShowFooter: false,
  },
  {
    path: "/Events",
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
    path: "/SignUp",
    page: SignUp,
    isShowHeader: false,
    isShowFooter: false,
  },
  {
    path: "/SignIn",
    page: SignIn,
    isShowHeader: false,
    isShowFooter: false,
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
