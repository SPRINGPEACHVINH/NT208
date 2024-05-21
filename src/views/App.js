import React, { Fragment, useEffect } from "react";
import { routes } from "../routes";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DefaultComponentFooter from "../components/DefaultComponent/DefaultComponentFooter";
import DefaultComponentHeader from "../components/DefaultComponent/DefaultComponentHeader";

function App() {
  useEffect(() => {
    fetchApi();
  }, []);

  const fetchApi = async () => {
    const res = await fetch(`${process.env.REACT_API_URL_BACKEND}/user/getAll`);
    const data = await res.json();
    console.log("res", data);
  };
  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page;
            const HeaderLayout = route.isShowHeader
              ? DefaultComponentHeader
              : Fragment;
            const FooterLayout = route.isShowFooter
              ? DefaultComponentFooter
              : Fragment;
            return (
              <Route
                path={route.path}
                element={
                  <HeaderLayout>
                    <FooterLayout>
                      <Page />
                    </FooterLayout>
                  </HeaderLayout>
                }
              />
            );
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;