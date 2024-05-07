import React, { Fragment } from "react";
import { routes } from "../routes";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DefaultComponent from "../components/DefaultComponent/DefaultComponent";
// import Sidebar from "../components/Sidebar"
// import Form from "../components/Form"

function App() {
  return (
    // <Fragment>
    //   <Sidebar />
    //   <Form />
    // </Fragment>
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
