import React from "react";
import "../../styles/Banner.css";
 
const ShowBanner = () => {
    return (
        <div class="banner">
            <div class="container content desktop">
                <div class="text-wrapper">
                    <div id="circle1" class="circle"></div>
                    <div id="circle2" class="circle"></div>
                    <svg width="4" height="415" viewBox="0 0 4 415" fill="none" xmlns="http://www.w3.org/2000/svg" id="vertical-dashed">
                        <path stroke="#27272A" stroke-width="4" stroke-linecap="round" stroke-dasharray="4 10" d="M2 2v411"></path>
                    </svg>
                    <svg width="4" height="415" viewBox="0 0 4 415" fill="none" xmlns="http://www.w3.org/2000/svg" id="vertical-dashed-2">
                        <path stroke="#27272A" stroke-width="4" stroke-linecap="round" stroke-dasharray="4 10" d="M2 2v411"></path>
                    </svg>
                    <div class="text">
                        <div class="info">
                            <p id="title"><strong>WESTLIFE THE HITS TOUR 2024 LIVE IN HANOI</strong></p>
                            <p id="date">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon">
                                    <path d="M4.333.333C4.702.333 5 .632 5 1v.667h4V1a.667.667 0 011.333 0v.667H11a2.667 2.667 0 012.667 2.667v1.333H.333V4.334A2.667 2.667 0 013 1.667h.667V1c0-.368.298-.667.666-.667zM13.667 7H.333v5.334c0 .736.597 1.333 1.334 1.333h10.666c.737 0 1.334-.597 1.334-1.333V7z" fill="#fff"></path>
                                </svg>
                                <span id="date-text">20:00 - 23:00, 04 tháng 06, 2024</span>
                            </p>
                            <p id="more-days">
                                <a href="#ticket-info">+ 1 ngày khác</a>
                            </p>
                            <p id="venue">
                                <svg width="22" height="28" viewBox="0 0 22 28" fill="none" xmlns="http://www.w3.org/2000/svg" id="location-icon" class="icon">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.031 3.307a10.514 10.514 0 0113.937 0c4.485 3.945 4.955 10.854 1.058 15.392l-7.015 8.17a1.333 1.333 0 01-2.023 0l-7.015-8.17C-.923 14.161-.454 7.252 4.031 3.307zM11 14.667A3.333 3.333 0 1011 8a3.333 3.333 0 000 6.666z" fill="#000"></path>
                                </svg>
                                <span class="venue-text">Athletes Arena Mỹ Đình</span>
                            </p>
                            <p id="address">Phố Trần Hữu Dực, Phường Cầu Diễn, Huyện Nam Từ Liêm, Thành Phố Hà Nội</p>
                        </div>
                        <div class="price">
                            <div id="ticket-price">
                                <span>Giá từ</span>
                                <a href="#ticket-info" id="price-value">
                                    <span>850.000 đ</span>
                                    <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M.293.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L5.586 7 .293 1.707a1 1 0 010-1.414z" fill="#ff4500"></path>
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
                    <img src="https://salt.tkbcdn.com/ts/ds/1a/52/a2/4303c4da7ba6e5806b06e9d40a91d0c5.png" alt="Banner cover"/>
                </div>
            </div>
        </div>
    )
}

export default ShowBanner;