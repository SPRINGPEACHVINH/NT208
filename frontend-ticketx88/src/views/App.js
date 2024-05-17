import React, { Fragment, useEffect } from "react";
import axios from "axios";
import { routes } from "../routes";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DefaultComponent from "../components/DefaultComponent/DefaultComponent";

function App() {

  useEffect(() => {})

  const fetchApi = async () => {
    const res = axios.get(`${process.env.REACT_API_URL_BACKEND}/`)
  }
  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page;
            const Layout = route.isShowHeader ? DefaultComponent : Fragment;
            return (
              <Route path={route.path} element={
                <Layout>
                  <Page />
                </Layout>
              } />
            )
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
