import React, { useRef } from "react";
import "../../styles/Description.css";

const ShowDescription = ({ show }) => {
  const descriptionDiv = useRef(null);
  const whitePad = useRef(null);
  const button = useRef(null);

  const toggleDescriptionHeight = () => {
    if (descriptionDiv.current.style.maxHeight !== "255px") {
      descriptionDiv.current.style.maxHeight = "255px";
      whitePad.current.style.opacity = "1";
      button.current.classList.remove("up");
      button.current.classList.add("down");
    } else {
      descriptionDiv.current.style.maxHeight = "1000px";
      whitePad.current.style.opacity = "0";
      button.current.classList.remove("down");
      button.current.classList.add("up");
    }
  };

  return (
    <div id="desc-pad">
      <h3 className="title font-arial">GIỚI THIỆU</h3>
      <div id="description" ref={descriptionDiv}>
        <p className="details font-arial">
          <strong>
            {show.name} - {show.date}
          </strong>
        </p>
        <p className="details">
          <strong>Thời gian: {show.date}</strong>
        </p>
        <p className="details">
          <strong>Địa điểm: {show.location}</strong>
        </p>
      </div>
      <div id="white-pad" ref={whitePad}></div>
      <div id="read-more-button" onClick={toggleDescriptionHeight}>
        <button id="the-button" className="arrow down" ref={button}></button>
      </div>
    </div>
  );
};

export default ShowDescription;
