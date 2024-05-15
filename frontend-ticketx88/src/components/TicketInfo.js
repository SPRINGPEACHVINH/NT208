import React from "react";
import "../styles/TicketInfo.css";

const TicketInfo = () => {
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
        <div className="ticket-header" onClick={() => toggleDetails("main-details")}>
          18:00 - 22:00, 31 Tháng 05, 2024
          <button className="buy-button">Mua vé ngay</button>
        </div>
        <div id="main-details" className="ticket-details">
          <div
            className="detail"
            onClick={() => toggleDetails("standard-details")}
          >
            STANDARD - RÌ RÀO <span>650.000 đ</span>
          </div>
          <div id="standard-details" className="sub-details">
            Giá vé đã bao gồm 01 đồ uống
          </div>
          <div
            className="detail"
            onClick={() => toggleDetails("premium-details")}
          >
            PREMIUM - LAO XAO <span>1.000.000 đ</span>
          </div>
          <div id="premium-details" className="sub-details">
            Giá vé đã bao gồm 01 đồ uống
          </div>
          <div className="detail" onClick={() => toggleDetails("vip-details")}>
            VIP - VI VU <span>1.350.000 đ</span>
          </div>
          <div id="vip-details" className="sub-details">
            Giá vé đã bao gồm 01 đồ uống
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketInfo;
