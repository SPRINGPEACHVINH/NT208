import React from "react";
import "../../styles/Footer.css";

const ShowFooter = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section contact-info">
          <h3>Hotline</h3>
          <p>Thứ 2 - Thứ 6 (8:30 - 18:30)</p>
          <p className="hotline">📞1900.JQKA</p>

          <h3>Email</h3>
          <p>
            📧{" "}
            <a href="mailto:22521666@gm.uit.edu.vn">22521666@gm.uit.edu.vn</a>
          </p>

          <h3>Văn phòng</h3>
          <a
            href="https://maps.app.goo.gl/VRiKvC7nGUm4mtKE9"
            target="_blank"
            rel="noopener noreferrer"
          >
            📍Trường Đại học Công Nghệ Thông Tin.
          </a>
        </div>
        <div className="footer-section">
          <h3>Dành cho Khách hàng</h3>
          <p className="terms">Điều khoản sử dụng cho khách hàng</p>

          <h3>Dành cho Ban Tổ chức</h3>
          <p className="terms">Điều khoản sử dụng cho ban tổ chức</p>

          <h3>Đăng ký nhận email về các sự kiện hot nhất</h3>
          <form className="email-form">
            <input type="email" placeholder="Nhập email của bạn" />
            <button type="submit">➤</button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default ShowFooter;
