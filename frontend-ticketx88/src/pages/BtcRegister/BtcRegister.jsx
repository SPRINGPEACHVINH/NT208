import React from "react";
import Form from "./Form.js";
import Sidebar from "./Sidebar.js";
import "../../styles/BtcRegister.css";

const BtcRegister = () => {
  return (
    <div className="row">
      <div className="col-md-3">
        <Sidebar />
      </div>
      <div className="col-md-9">
        <Form />
      </div>
    </div>
  );
};

export default BtcRegister;
