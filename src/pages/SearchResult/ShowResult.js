import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../../styles/SearchResult.module.css";
import loadingImage from "../../assets/images/loading.gif";

const ShowResults = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      const response = await fetch(
        `https://ticketx88.azurewebsites.net/api/event/search?q=${encodeURIComponent(query)}`
      );
      const { data } = await response.json();
      setEvents(data);
      setIsLoading(false);
    };

    fetchEvents();
  }, [query]);

  return (
    <div>
      <h1 className={styles.indicate}>Kết quả tìm kiếm cho: {query}</h1>
      {isLoading ? (
        <div className={styles.loadingContainer}>
          <img
            className={styles.loadingImage}
            src={loadingImage}
            alt="Loading..."
          />
        </div>
      ) : (
        <div className={styles.cardList}>
          {events.length > 0 ? (
            events.map((event) => (
              <div
                className={styles.card}
                key={event.EventName}
                onClick={() => {
                  navigate(`/Description/${event.EventId}`);
                }}
              >
                <img src={event.Picture_event} alt={event.EventName} />
                <div className={styles.cardContent}>
                  <h2 className={styles.cardTitle}>{event.EventName}</h2>
                  <p className={styles.price}>
                    Chỉ từ: {event.TicketPrice.toLocaleString("vi-VN")} VNĐ
                  </p>
                  <div className={styles.dateCategory}>
                    <p className={styles.date}>
                      {new Date(event.EventTime).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </p>
                    <p className="category">{event.EventCategory}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className={styles.noCard}>
              Không có kết quả cho sự kiện này.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ShowResults;
