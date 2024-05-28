import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/ShowHome.css";
import loadingGif from "../../assets/images/loading.gif";

const ShowHome = () => {
  const [/*currentSlide*/, setCurrentSlide] = useState(0);
  const [events, setEvents] = useState([]);
  const [slideEvents, setSlideEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAutoSliding, setIsAutoSliding] = useState(true);
  const autoSlideRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:8881/api/event/all");
        const { data } = await response.json();
        setEvents(data);
        setSlideEvents(data.slice(0, 3));
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const changeSlide = (n, manual = false) => {
    setCurrentSlide((currentSlide) => {
      const slides = document.querySelectorAll(".slide");
      const dots = document.querySelectorAll(".dot");

      slides[currentSlide].classList.remove(
        "active",
        "slide-in-left",
        "slide-in-right"
      );
      dots[currentSlide].classList.remove("active");

      let newSlide = (currentSlide + n + slides.length) % slides.length;

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

    if (manual) {
      setIsAutoSliding(false);
      clearTimeout(autoSlideRef.current);
      autoSlideRef.current = setTimeout(() => {
        setIsAutoSliding(true);
      }, 3000); // 3 seconds to resume auto sliding
    }
  };

  useEffect(() => {
    if (!isLoading) {
      const prevButton = document.querySelector(".prev");
      const nextButton = document.querySelector(".next");

      const handlePrevClick = () => changeSlide(-1, true);
      const handleNextClick = () => changeSlide(1, true);

      prevButton.addEventListener("click", handlePrevClick);
      nextButton.addEventListener("click", handleNextClick);

      return () => {
        prevButton.removeEventListener("click", handlePrevClick);
        nextButton.removeEventListener("click", handleNextClick);
      };
    }
  }, [isLoading]);

  useEffect(() => {
    if (isAutoSliding) {
      const interval = setInterval(() => {
        changeSlide(1);
      }, 3000); // Change slide every 3 seconds
      return () => clearInterval(interval);
    }
  }, [isAutoSliding]);

  const groupedEvents = events.reduce((groups, event) => {
    const category = event.EventCategory;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(event);
    return groups;
  }, {});

  if (isLoading) {
    return (
      <div className="loading-container">
        <img src={loadingGif} alt="Loading..." />
      </div>
    );
  }

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
              loading="lazy" // Lazy loading images
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
              <div
                className="card"
                key={event.EventName}
                onClick={() => {
                  navigate(`/Description/${event.EventId}`);
                }}
              >
                <img
                  src={event.Picture_event}
                  alt={event.EventName}
                  loading="lazy"
                />
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