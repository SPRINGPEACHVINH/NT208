import { routes } from "../routes";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Form from "../components/Form";
import React, { Fragment } from "react";

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
            return <Route path={route.path} element={<Page />} />;
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
