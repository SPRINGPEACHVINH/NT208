import React from "react";
import Footer from "../Footer/Footer";

const DefaultComponent = ({ children }) => {
  return (
    <div>
      {children}
      <Footer />
    </div>
  );
};
export default DefaultComponent;
