import React, { useEffect, useState } from "react";
import "../../styles/ShowHome.css";

const ShowHome = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [events, setEvents] = useState([]);
  const [slideEvents, setSlideEvents] = useState([]);

  const changeSlide = (n) => {
    setCurrentSlide((currentSlide) => {
      const slides = document.querySelectorAll(".slide");
      const dots = document.querySelectorAll(".dot");

      slides[currentSlide].classList.remove(
        "active",
        "slide-in-left",
        "slide-in-right"
      );
      dots[currentSlide].classList.remove("active");

      let newSlide = (currentSlide - n + slides.length) % slides.length;

      if (n > 0) {
        slides[currentSlide].classList.add("slide-out-left");
        slides[newSlide].classList.remove("slide-out-right", "slide-out-left");
        slides[newSlide].classList.add("slide-in-right");
      } else {
        slides[currentSlide].classList.add("slide-out-right");
        slides[newSlide].classList.remove("slide-out-right", "slide-out-left");
        slides[newSlide].classList.add("slide-in-left");
      }

      slides[newSlide].classList.add("active");
      dots[newSlide].classList.add("active");

      return newSlide;
    });
  };

  useEffect(() => {
    document.querySelector(".prev").addEventListener("click", function () {
      changeSlide(-1);
    });

    document.querySelector(".next").addEventListener("click", function () {
      changeSlide(1);
    });

    const fetchEvents = async () => {
      const response = await fetch("https://nt208-antt.azurewebsites.net/api/event/all"); // Replace with your API URL
      const { data } = await response.json();
      setEvents(data);
    };

    const fetchSlideEvents = async () => {
      const response = await fetch("http://localhost:8881/api/event/all"); // Replace wit h your API URL
      const { data } = await response.json();
      setSlideEvents(data.slice(0, 3)); // Get only the first 3 events
    };

    fetchEvents();
  }, []);

  const groupedEvents = events.reduce((groups, event) => {
    const category = event.EventCategory;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(event);
    return groups;
  }, {});

  return (
    <div>
      <div className="slides">
        {slideEvents.map((event, index) => (
          <div
            className={`slide ${index === 0 ? "active" : ""}`}
            data-slide={index}
            key={event.EventName}
          >
            <img
              className="slide-img"
              src={event.Picture_event}
              alt={event.EventName}
            />
          </div>
        ))}

        <a className="prev">&#10094;</a>
        <a className="next">&#10095;</a>

        <div className="dot-container">
          {slideEvents.map((_, index) => (
            <span
              className={`dot ${index === 0 ? "active" : ""}`}
              key={index}
            ></span>
          ))}
        </div>
      </div>

      {Object.entries(groupedEvents).map(([category, events]) => (
        <div key={category}>
          <h1 className="category-header">{category}</h1>
          <div className="card-list">
            {events.map((event) => (
              <div className="card" key={event.EventName}>
                <img src={event.Picture_event} alt={event.EventName} />
                <div className="card-content">
                  <h2 className="card-title">{event.EventName}</h2>
                  <p className="price">
                    Chỉ từ: {event.TicketPrice.toLocaleString("vi-VN")} VNĐ
                  </p>
                  <div className="date-category">
                    <p className="date">
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
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShowHome;
