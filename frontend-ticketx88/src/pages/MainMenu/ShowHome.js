import React, { useEffect, useState } from "react";
import "../../styles/ShowHome.css";

const ShowHome = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

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
  };

  useEffect(() => {
    document.querySelector(".prev").addEventListener("click", function () {
      changeSlide(-1);
    });

    document.querySelector(".next").addEventListener("click", function () {
      changeSlide(1);
    });
  }, []);

  return (
    <div>
      <div className="slides">
        <div className="slide active" data-slide="0">
          <h2>Example headline.</h2>
          <p>
            Some representative placeholder content for the first slide of the
            carousel.
          </p>
          <a href="#" className="button">
            Sign up today
          </a>
        </div>

        <div className="slide" data-slide="1">
          <h2>Another example headline.</h2>
          <p>
            Some representative placeholder content for the second slide of the
            carousel.
          </p>
          <a href="#" className="button">
            Learn more
          </a>
        </div>

        <div className="slide" data-slide="2">
          <h2>One more for good measure.</h2>
          <p>
            Some representative placeholder content for the third slide of this
            carousel.
          </p>
          <a href="#" className="button">
            Browse gallery
          </a>
        </div>

        <a className="prev">&#10094;</a>
        <a className="next">&#10095;</a>

        <div className="dot-container">
          <span className="dot active"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </div>

      <div className="card-list">
        {/* Cards will be dynamically inserted here */}
      </div>
    </div>
  );
};

export default ShowHome;