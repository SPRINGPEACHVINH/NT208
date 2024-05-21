import React, { useRef } from "react";
import "../../styles/Description.css";

const ShowDescription = ({ event }) => {
  const descriptionDiv = useRef(null);
  const whitePad = useRef(null);
  const button = useRef(null);

  const eventDate = new Date(event.EventTime);
  const dateString = eventDate.toLocaleDateString("en-GB");
  const timeString = eventDate.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const formattedDateTime = `${dateString} ${timeString}`;

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
      {event ? (
        <>
          <h3 className="title font-arial">GIỚI THIỆU</h3>
          <div id="description" ref={descriptionDiv}>
            <p className="details font-arial">
              <strong>
                {event.EventName} - {formattedDateTime}
              </strong>
            </p>
            <p className="details">
              <strong>Thời gian: {formattedDateTime}</strong>
            </p>
            <p className="details">
              <strong>Địa điểm: {event.EventLocation}</strong>
            </p>
          </div>
          <div id="white-pad" ref={whitePad}></div>
          <div id="read-more-button" onClick={toggleDescriptionHeight}>
            <button
              id="the-button"
              className="arrow down"
              ref={button}
            ></button>
          </div>
        </>
      ) : (
        <p>Event not found</p>
      )}
    </div>
  );
};

export default ShowDescription;
