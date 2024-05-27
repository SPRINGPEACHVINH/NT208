import React from "react";
import "../../styles/MyEvents.css";
import {
  CalendarOutlined,
  DollarCircleOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";

function MyEvents({ events }) {
  const getEventTypeDisplay = (eventType) => {
    switch (eventType) {
      case "nhac-song":
        return "Nhạc sống";
      case "san-khau-va-nghe-thuat":
        return "Sân khấu & Nghệ thuật";
      case "the-thao":
        return "Thể thao";
      default:
        return eventType;
    }
  };

  return (
    <>
      {events.length === o ? (
        <div className="my-events">Không có sự kiện</div>
      ) : (
        events.map((event, index) => (
          <div key={index} className="my-events">
            {event.coverImage && (
              <div className="event-cover">
                <img
                  src={event.coverImage}
                  alt="Cover"
                  className="event-cover-image"
                />
              </div>
            )}
            <div>
              <h4>{event.eventName}</h4>
              <div
                style={{
                  display: "flex",
                }}
              >
                <div style={{ marginRight: "10px" }}>
                  <AppstoreOutlined />
                </div>
                <span className="color-info">
                  {getEventTypeDisplay(event.eventType)}
                </span>
              </div>
              <div style={{ display: "flex" }}>
                <div style={{ marginRight: "10px" }}>
                  <CalendarOutlined />
                </div>
                <div className="color-info">{event.eventDateTime}</div>
              </div>
              <div style={{ display: "flex" }}>
                <div style={{ marginRight: "10px" }}>
                  <DollarCircleOutlined />
                </div>
                <div className="color-info">{event.eventTicketPrice} VNĐ</div>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
}

export default MyEvents;
