import React from "react";
import "../styles/TicketInfo.css";

const TicketInfo = ({ event }) => {
  const basePrice = event.TicketPrice;

  const calculatePrice = (percentage) => {
    const price = basePrice * (1 + percentage / 100);
    return new Intl.NumberFormat("de-DE").format(Math.floor(price));
  };

  const eventDate = new Date(event.EventTime);

  const hours = eventDate.getHours().toString().padStart(2, "0");
  const minutes = eventDate.getMinutes().toString().padStart(2, "0");
  const day = eventDate.getDate().toString().padStart(2, "0");
  const month = (eventDate.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed in JavaScript
  const year = eventDate.getFullYear();

  const formattedEventTime = `${hours}:${minutes}, ${day}/${month}/${year}`;

  const toggleDetails = (id) => {
    const element = document.getElementById(id);
    const maxHeight = element.style.maxHeight;

    if (maxHeight === "0px" || !maxHeight) {
      element.style.boxSizing = "border-box";
      element.style.maxHeight = "none";
      const scrollHeight = element.scrollHeight + "px";
      const offsetHeight = element.offsetHeight + "px";
      const totalHeight =
        parseInt(scrollHeight) + parseInt(offsetHeight) + "px";
      element.style.maxHeight = "0px";
      setTimeout(() => {
        element.style.maxHeight = totalHeight;
        if (id === "main-details") {
          const subDetails = document.querySelectorAll(".sub-details");
          subDetails.forEach((subDetail) => {
            subDetail.style.padding = "0px";
            subDetail.style.maxHeight = "0px";
          });
        } else {
          element.style.padding = "10px 15px";
        }
      }, 0);
    } else {
      element.dataset.originalPadding = element.style.padding;
      element.style.maxHeight = "0px";
      if (id !== "main-details") {
        element.style.padding = "0px";
      }
    }
  };

  return (
    <div className="ticket-info-container">
      <div className="ticket-info">
        <div
          className="ticket-header"
          onClick={() => toggleDetails("main-details")}
        >
          {formattedEventTime}
          <button className="buy-button">Mua vé ngay</button>
        </div>
        <div id="main-details" className="ticket-details">
          <div
            className="detail resolution-144p"
            onClick={() => toggleDetails("details-144p")}
          >
            144p <span>{calculatePrice(0)} VNĐ</span>
          </div>
          <div id="details-144p" className="sub-details">
            Sẽ xem được video ở độ phân giải 144p
          </div>
          <div
            className="detail resolution-240p"
            onClick={() => toggleDetails("details-240p")}
          >
            240p <span>{calculatePrice(20)} VNĐ</span>
          </div>
          <div id="details-240p" className="sub-details">
            Sẽ xem được video ở độ phân giải 240p
          </div>
          <div
            className="detail resolution-360p"
            onClick={() => toggleDetails("details-360p")}
          >
            360p <span>{calculatePrice(40)} VNĐ</span>
          </div>
          <div id="details-360p" className="sub-details">
            Sẽ xem được video ở độ phân giải 360p
          </div>
          <div
            className="detail resolution-480p"
            onClick={() => toggleDetails("details-480p")}
          >
            480p <span>{calculatePrice(60)} VNĐ</span>
          </div>
          <div id="details-480p" className="sub-details">
            Sẽ xem được video ở độ phân giải 480p
          </div>
          <div
            className="detail resolution-720p"
            onClick={() => toggleDetails("details-720p")}
          >
            720p <span>{calculatePrice(80)} VNĐ</span>
          </div>
          <div id="details-720p" className="sub-details">
            Sẽ xem được video ở độ phân giải 720p
          </div>
          <div
            className="detail resolution-1080p"
            onClick={() => toggleDetails("details-1080p")}
          >
            1080p <span>{calculatePrice(100)} VNĐ</span>
          </div>
          <div id="details-1080p" className="sub-details">
            Sẽ xem được video ở độ phân giải 1080p
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketInfo;
