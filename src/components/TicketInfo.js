import React, { useState } from "react";
import "../styles/TicketInfo.css";
import { Modal, message } from "antd";
import { useNavigate } from "react-router-dom";

const TicketInfo = ({ event, user }) => {
  const basePrice = event.TicketPrice;
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [ticket, setTicket] = useState(null);

  const navigate = useNavigate();

  const calculatePrice = (percentage) => {
    const price = basePrice * (1 + percentage / 100);
    return new Intl.NumberFormat("de-DE").format(Math.floor(price));
  };

  const handleSelect = (price, resolution, detailId) => {
    if (selectedDetail) {
      toggleDetails(`details-${selectedDetail}`);
    }

    if (selectedDetail === resolution) {
      setSelectedDetail(null);
      setSelectedPrice(null);
    } else {
      setSelectedDetail(resolution);
      setSelectedPrice(price);
      toggleDetails(detailId);
    }
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

  const handleBuyTicket = async () => {
    if (!user) {
      message.error("User is not logged in");
      return;
    }

    const userName = localStorage.getItem("username");
    const userDetailsResponse = await fetch(
      `https://nt208.onrender.com/api/user/get-details/${userName}`
    );
    const res = await userDetailsResponse.json();
    const userDetails = res.data;

    const sendMail = await fetch("https://nt208.onrender.com/api/mail/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Email: userDetails.Email,
        Subject: "Ticket purchase",
        Body: `You have purchased a ticket for the event ${event.EventName}, your ticket code is: ${ticket}`,
      }),
    });
    if(!sendMail.ok) {
      message.error("Failed to send email");
    }

    const response = await fetch(
      "https://nt208.onrender.com/api/ticket/payForTicket",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          EventId: event.EventId,
          UserId: userDetails.Email,
        }),
      }
    );

    if (!response.ok) {
      message.error("Failed to buy ticket");
      return;
    }

    const data = await response.json();
    setTicket(data.ticket);
    message.success("Ticket purchased successfully!");
    setModalOpen(true);
  };

  return (
    <div className="ticket-info-container">
      <div className="ticket-info">
        <div
          className="ticket-header"
          onClick={() => {
            toggleDetails("main-details");
            setSelectedDetail(null);
            setSelectedPrice(null);
          }}
        >
          {formattedEventTime}
          <button
            className="buy-button"
            onClick={(e) => {
              e.stopPropagation();
              handleBuyTicket();
            }}
          >
            Mua vé ngay
          </button>
          <button
            className="code-input-button"
            onClick={(e) => {
              e.stopPropagation();
              navigate("/code-input");
            }}
          >
            Đã có vé?
          </button>
        </div>
        <div id="main-details" className="ticket-details">
          <div
            className={`detail resolution-144p ${
              selectedDetail === "144p" ? "selected" : ""
            }`}
            onClick={() =>
              handleSelect(calculatePrice(0), "144p", "details-144p")
            }
          >
            144p <span>{calculatePrice(0)} VNĐ</span>
          </div>
          <div id="details-144p" className="sub-details">
            Sẽ xem được video ở độ phân giải 144p
          </div>
          <div
            className={`detail resolution-240p ${
              selectedDetail === "240p" ? "selected" : ""
            }`}
            onClick={() =>
              handleSelect(calculatePrice(20), "240p", "details-240p")
            }
          >
            240p <span>{calculatePrice(20)} VNĐ</span>
          </div>
          <div id="details-240p" className="sub-details">
            Sẽ xem được video ở độ phân giải 240p
          </div>
          <div
            className={`detail resolution-360p ${
              selectedDetail === "360p" ? "selected" : ""
            }`}
            onClick={() =>
              handleSelect(calculatePrice(40), "360p", "details-360p")
            }
          >
            360p <span>{calculatePrice(40)} VNĐ</span>
          </div>
          <div id="details-360p" className="sub-details">
            Sẽ xem được video ở độ phân giải 360p
          </div>
          <div
            className={`detail resolution-480p ${
              selectedDetail === "480p" ? "selected" : ""
            }`}
            onClick={() =>
              handleSelect(calculatePrice(60), "480p", "details-480p")
            }
          >
            480p <span>{calculatePrice(60)} VNĐ</span>
          </div>
          <div id="details-480p" className="sub-details">
            Sẽ xem được video ở độ phân giải 480p
          </div>
          <div
            className={`detail resolution-720p ${
              selectedDetail === "720p" ? "selected" : ""
            }`}
            onClick={() =>
              handleSelect(calculatePrice(80), "720p", "details-720p")
            }
          >
            720p <span>{calculatePrice(80)} VNĐ</span>
          </div>
          <div id="details-720p" className="sub-details">
            Sẽ xem được video ở độ phân giải 720p
          </div>
          <div
            className={`detail resolution-1080p ${
              selectedDetail === "1080p" ? "selected" : ""
            }`}
            onClick={() =>
              handleSelect(calculatePrice(100), "1080p", "details-1080p")
            }
          >
            1080p <span>{calculatePrice(100)} VNĐ</span>
          </div>
          <div id="details-1080p" className="sub-details">
            Sẽ xem được video ở độ phân giải 1080p
          </div>
        </div>
      </div>
      <Modal
        title="Bạn đã mua vé thành công!"
        centered
        visible={modalOpen}
        onOk={async () => {
          // setModalOpen(false);
          // try {
          //   await navigator.clipboard.writeText(ticket);
          //   message.success("Ticket copied to clipboard");
          // } catch (err) {
          //   console.error("Failed to copy ticket: ", err);
          // }
        }}
      >
        <p>Mã vé đã được gửi về email của bạn</p>
      </Modal>
    </div>
  );
};

export default TicketInfo;
