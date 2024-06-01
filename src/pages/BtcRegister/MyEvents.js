import React, { useState, useEffect } from "react";
import "../../styles/MyEvents.css";
import {
  CalendarOutlined,
  DollarCircleOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { Pagination } from "antd";
import loadingGif from "../../assets/images/loading.gif";
import moment from "moment";

function MyEvents({ username }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageSize = 1;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          "https://nt208.onrender.com/api/user/get-events/" + username
        );
        if (!response.ok) {
          throw new Error("Failed to fetch events.");
        }
        const eventData = await response.json();
        setEvents(eventData.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [username]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <img src={loadingGif} alt="Loading..." />
      </div>
    );
  }

  const formatPrice = (price) => {
    const parts = price.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    const formattedPrice = parts.join(".") + " VNĐ";

    return formattedPrice;
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedEvents = events.slice(startIndex, endIndex);

  return (
    <div>
      {events.length === 0 ? (
        <div>Không có sự kiện</div>
      ) : (
        paginatedEvents.map((event) => (
          <div key={event.id} className="my-events">
            {event.Picture_event && (
              <div className="event-cover">
                <img
                  src={event.Picture_event}
                  alt="CoverEvent"
                  className="event-cover-image"
                />
              </div>
            )}
            <div>
              <h4>{event.EventName}</h4>
              <div style={{ display: "flex" }}>
                <div style={{ marginRight: "10px" }}>
                  <AppstoreOutlined />
                </div>
                <span className="color-info">{event.EventCategory}</span>
              </div>
              <div style={{ display: "flex" }}>
                <div style={{ marginRight: "10px" }}>
                  <CalendarOutlined />
                </div>
                <div className="color-info">
                  {moment(event.EventTime).format("DD/MM/YYYY - HH:mm")}
                </div>
              </div>
              <div style={{ display: "flex" }}>
                <div style={{ marginRight: "10px" }}>
                  <DollarCircleOutlined />
                </div>
                <div className="color-info">
                  {formatPrice(event.TicketPrice)}
                </div>
              </div>
            </div>
          </div>
        ))
      )}
      {events.length > 0 && (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Pagination
            current={currentPage}
            total={events.length}
            pageSize={pageSize}
            onChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}

export default MyEvents;
