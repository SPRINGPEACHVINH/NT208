import React, { useState, useEffect } from "react";
import "../../styles/Banner.css";

const ShowBanner = ({ event }) => {
    const eventDate = new Date(event.EventTime);
    const dateString = eventDate.toLocaleDateString("en-GB");
    const timeString = eventDate.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const formattedDateTime = `${dateString} ${timeString}`;
    
    // Thiết lập lắng nghe sự kiện resize window để kiểm tra chế độ xem
    useEffect(() => {
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => {
            window.removeEventListener("resize", checkMobile);
        };
    });

    // Hàm để kiểm tra xem trên điện thoại hay không
    const [isMobile, setIsMobile] = useState(false);
    const checkMobile = () => {
        setIsMobile(window.innerWidth <= 992); // Định nghĩa ngưỡng chiều rộng cho điện thoại
    };
    return (
      <div class="banner">
        {!isMobile && (
          <div style={{ display: "flex" }}>
            <div class="container content desktop">
              <div class="text-wrapper">
                <div id="circle1" class="circle"></div>
                <div id="circle2" class="circle"></div>
                <svg
                  width="4"
                  height="415"
                  viewBox="0 0 4 415"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  id="vertical-dashed"
                >
                  <path
                    stroke="#27272A"
                    stroke-width="4"
                    stroke-linecap="round"
                    stroke-dasharray="4 10"
                    d="M2 2v411"
                  ></path>
                </svg>
                <svg
                  width="4"
                  height="415"
                  viewBox="0 0 4 415"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  id="vertical-dashed-2"
                >
                  <path
                    stroke="#27272A"
                    stroke-width="4"
                    stroke-linecap="round"
                    stroke-dasharray="4 10"
                    d="M2 2v411"
                  ></path>
                </svg>
                <div class="text">
                  <div class="info">
                    <p id="title">
                      <strong>{event.EventName}</strong>
                    </p>
                    <p id="date">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon"
                      >
                        <path
                          d="M4.333.333C4.702.333 5 .632 5 1v.667h4V1a.667.667 0 011.333 0v.667H11a2.667 2.667 0 012.667 2.667v1.333H.333V4.334A2.667 2.667 0 013 1.667h.667V1c0-.368.298-.667.666-.667zM13.667 7H.333v5.334c0 .736.597 1.333 1.334 1.333h10.666c.737 0 1.334-.597 1.334-1.333V7z"
                          fill="#fff"
                        ></path>
                      </svg>
                      <span id="date-text">{formattedDateTime}</span>
                    </p>
                    <p id="venue">
                      <svg
                        width="22"
                        height="28"
                        viewBox="0 0 22 28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        id="location-icon"
                        class="icon"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M4.031 3.307a10.514 10.514 0 0113.937 0c4.485 3.945 4.955 10.854 1.058 15.392l-7.015 8.17a1.333 1.333 0 01-2.023 0l-7.015-8.17C-.923 14.161-.454 7.252 4.031 3.307zM11 14.667A3.333 3.333 0 1011 8a3.333 3.333 0 000 6.666z"
                          fill="#000"
                        ></path>
                      </svg>
                      <span class="venue-text">{event.EventLocation}</span>
                    </p>
                  </div>
                  <div class="price">
                    <div id="ticket-price">
                      <span>Giá từ</span>
                      <a href="#ticket-info" id="price-value">
                        <span>
                          {event.TicketPrice.toLocaleString("vi-VN")} VNĐ
                        </span>
                        <svg
                          width="8"
                          height="14"
                          viewBox="0 0 8 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M.293.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L5.586 7 .293 1.707a1 1 0 010-1.414z"
                            fill="#ff4500"
                          ></path>
                        </svg>
                      </a>
                    </div>
                    <a href="#ticket-info">
                      <button id="buynow-btn">Chọn lịch diễn</button>
                    </a>
                  </div>
                </div>
              </div>
              <div class="img-wrapper">
                <img
                  src={event.Picture_event}
                  alt="Banner cover"
                />
              </div>
            </div>
          </div>
        )}
        {isMobile && (
          <div style={{ display: "flex" }}>
            <div class="style-mobile container1 mobile">
              <div id="bg-wrapper">
                <img
                  src="https://salt.tkbcdn.com/ts/ds/1a/52/a2/4303c4da7ba6e5806b06e9d40a91d0c5.png"
                  alt="Banner cover blurred"
                />
              </div>
              <div id="banner-info-wrapper">
                <div id="banner-info-stack">
                  <div id="banner-img-wrapper">
                    <img
                      src="https://salt.tkbcdn.com/ts/ds/1a/52/a2/4303c4da7ba6e5806b06e9d40a91d0c5.png"
                      alt="Banner cover main display"
                    />
                  </div>
                  <div id="banner-info-content">
                    <p id="title">
                      <strong>WESTLIFE THE HITS TOUR 2024 LIVE IN HANOI</strong>
                    </p>
                    <p id="date">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon"
                      >
                        <path
                          d="M4.333.333C4.702.333 5 .632 5 1v.667h4V1a.667.667 0 011.333 0v.667H11a2.667 2.667 0 012.667 2.667v1.333H.333V4.334A2.667 2.667 0 013 1.667h.667V1c0-.368.298-.667.666-.667zM13.667 7H.333v5.334c0 .736.597 1.333 1.334 1.333h10.666c.737 0 1.334-.597 1.334-1.333V7z"
                          fill="#fff"
                        ></path>
                      </svg>
                      <span id="date-text">
                        20:00 - 23:00, 04 tháng 06, 2024
                      </span>
                    </p>
                    <p id="more-days">
                      <a href="#ticket-info">+ 1 ngày khác</a>
                    </p>
                    <p id="venue">
                      <svg
                        width="22"
                        height="28"
                        viewBox="0 0 22 28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        id="location-icon"
                        class="icon"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M4.031 3.307a10.514 10.514 0 0113.937 0c4.485 3.945 4.955 10.854 1.058 15.392l-7.015 8.17a1.333 1.333 0 01-2.023 0l-7.015-8.17C-.923 14.161-.454 7.252 4.031 3.307zM11 14.667A3.333 3.333 0 1011 8a3.333 3.333 0 000 6.666z"
                          fill="#000"
                        ></path>
                      </svg>
                      <span class="venue-text">Athletes Arena Mỹ Đình</span>
                    </p>
                    <p id="address">
                      Phố Trần Hữu Dực, Phường Cầu Diễn, Huyện Nam Từ Liêm,
                      Thành Phố Hà Nội
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {isMobile && (
          <div style={{ display: "flex", opacity: "60" }}>
            <div class="style-wrapper wrap mobile">
              <div class="style-mobile container2">
                <span>
                  <span>Giá từ</span>
                  <span id="min-price-value">
                    <span>850.000 đ</span>
                  </span>
                </span>
                <a href="#ticket-info">
                  <button
                    id="select-showing-btn"
                    class="style-select showingBtn"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      class="icon"
                      id="my-ticket-icon"
                    >
                      <path
                        d="M19.758 12a2.91 2.91 0 011.928-2.74c.52-.186.98-.617.98-1.17V5.243a1 1 0 00-1-1H2.334a1 1 0 00-1 1v2.849c0 .552.461.983.981 1.17a2.91 2.91 0 010 5.478c-.52.187-.98.618-.98 1.17v2.848a1 1 0 001 1h19.333a1 1 0 001-1V15.91c0-.552-.461-.983-.981-1.17A2.91 2.91 0 0119.758 12z"
                        stroke="#828BA0"
                        stroke-width="2"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                      <path
                        d="M8.121 10.06h7.758M8.121 13.94h7.758"
                        stroke="#828BA0"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </svg>
                    Chọn lịch diễn
                  </button>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    );
}

export default ShowBanner;