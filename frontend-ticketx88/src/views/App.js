import React, { Fragment, useEffect } from "react";
import { routes } from "../routes";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DefaultComponent from "../components/DefaultComponent/DefaultComponent";

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
            const Layout = route.isShowHeader ? DefaultComponent : Fragment;
            return (
              <Route
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
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
