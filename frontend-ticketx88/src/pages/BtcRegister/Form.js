import React, { useState, useEffect } from "react";
import "../../styles/Form.css";
import {
  RightOutlined,
  InboxOutlined,
  AuditOutlined,
  UndoOutlined,
  RedoOutlined,
  BoldOutlined,
  FontSizeOutlined,
} from "@ant-design/icons";
import { Upload, Input, Button, Space, Flex } from "antd";

const { Dragger } = Upload;

function Form() {
  const [activeStep, setActiveStep] = useState(0); // Bước hiện tại trong quá trình
  const [isMobile, setIsMobile] = useState(false); // Xác định nếu đang ở chế độ xem trên điện thoại
  const { TextArea } = Input;

  // Hàm để kiểm tra xem trên điện thoại hay không
  const checkMobile = () => {
    setIsMobile(window.innerWidth <= 768); // Định nghĩa ngưỡng chiều rộng cho điện thoại
  };

  // Thiết lập lắng nghe sự kiện resize window để kiểm tra chế độ xem
  useEffect(() => {
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  });

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handlePrevious = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <div>
      <div className="container-step">
        {/* step 1 */}
        {!isMobile && (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              position: "relative",
            }}
          >
            <div
              className={`ant-steps-item ${
                activeStep === 0
                  ? "ant-steps-item-active"
                  : "ant-steps-item-wait"
              }`}
            >
              <div className="ant-steps-item-icon">1</div>
              <div className="ant-steps-item-title">Đăng ký ban tổ chức</div>
            </div>
            <RightOutlined className="ant-steps-item-right-icon" />
          </div>
        )}
        {isMobile && (
          <div
            className={`ant-steps-icon ${
              activeStep === 0 ? "ant-steps-icon-active" : "ant-steps-icon-wait"
            }`}
          >
            <AuditOutlined className="ant-steps-item-audio-icon" />
          </div>
        )}
        {/* step 2 */}
        {!isMobile && (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              margin: "0 10%",
              position: "relative",
            }}
          >
            <div
              className={`ant-steps-item ${
                activeStep === 1
                  ? "ant-steps-item-active"
                  : "ant-steps-item-wait"
              }`}
            >
              <div className="ant-steps-item-icon">2</div>
              <div className="ant-steps-item-title">Thông tin sự kiện</div>
            </div>
            <RightOutlined className="ant-steps-item-right-icon" />
          </div>
        )}
        {isMobile && (
          <div
            className={`ant-steps-icon ${
              activeStep === 0 ? "ant-steps-icon-active" : "ant-steps-icon-wait"
            }`}
          >
            <AuditOutlined className="ant-steps-item-audio-icon" />
          </div>
        )}
        {/* step 3 */}
        {!isMobile && (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div
              className={`ant-steps-item ${
                activeStep === 2
                  ? "ant-steps-item-active"
                  : "ant-steps-item-wait"
              }`}
            >
              <div className="ant-steps-item-icon">3 </div>
              <div className="ant-steps-item-title">Thông tin thanh toán</div>
            </div>
          </div>
        )}
        {isMobile && (
          <div
            className={`ant-steps-icon ${
              activeStep === 0 ? "ant-steps-icon-active" : "ant-steps-icon-wait"
            }`}
          >
            <AuditOutlined className="ant-steps-item-audio-icon" />
          </div>
        )}
      </div>

      {activeStep === 0 && (
        <div className="container-content">
          <h3 style={{ fontSize: "50px", textAlign: "center" }}>
            Đăng ký ban tổ chức
          </h3>
          <div className="container-form-organizer">
            <div className="form-group">
              <div className="form-item">
                <label>
                  Tên doanh nghiệp<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  id="enterprise-name"
                  name="enterprise-name"
                  placeholder="Tên doanh nghiệp"
                />
                <span className="error-message">
                  Vui lòng nhập tên doanh nghiệp
                </span>
              </div>
              <div className="form-item">
                <label>
                  Mã số đăng ký kinh doanh
                  <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  id="enterprise-number-business"
                  name="enterprise-number-business"
                  placeholder="Mã số đăng ký kinh doanh"
                />
                <span className="error-message">
                  Vui lòng nhập mã số đăng ký kinh doanh
                </span>
              </div>
            </div>
            <div className="form-group">
              <div className="form-item">
                <label>
                  Số điện thoại<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="tel"
                  id="enterprise-phone"
                  name="enterprise-phone"
                  placeholder="Số điện thoại"
                  maxLength="10"
                  onInput={(e) =>
                    (e.target.value = e.target.value
                      .replace(/[^0-9]/g, "")
                      .slice(0, 10))
                  }
                />
                <span className="error-message">
                  Vui lòng nhập số điện thoại
                </span>
              </div>
              <div className="form-item">
                <label>
                  Email<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="email"
                  id="enterprise-email"
                  name="enterprise-email"
                  placeholder="Email"
                />
                <span className="error-message">Vui lòng nhập email</span>
              </div>
            </div>
            <div className="form-group">
              <div className=" form-item">
                <label>
                  Địa chỉ trụ sở<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  id="enterprise-address"
                  name="enterprise-address"
                  placeholder="Địa chỉ trụ sở"
                />
                <span className="error-message">Vui lòng nhập email</span>
              </div>
            </div>
          </div>

          <br />
          <br />

          <div className="form-group">
            <button type="submit">Lưu thông tin</button>
            {activeStep < 2 && (
              <button onClick={handleNext} type="button">
                Tiếp theo
              </button>
            )}
          </div>
        </div>
      )}

      {activeStep === 1 && (
        <div className="container-content">
          <h3 style={{ fontSize: "50px", textAlign: "center" }}>
            Thông tin sự kiện
          </h3>
          <div className="ant-container-drag-upload-cover-event">
            <Dragger>
              <p className="ant-upload-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Thêm ảnh nền sự kiện</p>
              <p className="ant-upload-hint">(1280x720)</p>
            </Dragger>
          </div>
          <div className="container-form-event">
            <div className="ant-container-drag-upload-logo-event">
              <Dragger>
                <p className="ant-upload-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Thêm logo sự kiện</p>
                <p className="ant-upload-hint">(720x958)</p>
              </Dragger>
            </div>
            <div className="form-group-event">
              <div className="form-item event-item">
                <label>
                  Tên sự kiện<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  id="event-name"
                  name="event-name"
                  placeholder="Tên sự kiện"
                />
                <span className="error-message">Vui lòng nhập tên sự kiện</span>
              </div>
              <div className="form-item event-item">
                <label>
                  Thể loại sự kiện<span style={{ color: "red" }}>*</span>
                </label>
                <select id="event-type" name="event-type">
                  <option value="" disabled selected hidden>
                    Vui lòng chọn
                  </option>
                  <option value="nhac-song">Nhạc sống</option>
                  <option value="san-khau-va-nghe-thuat">
                    Sân khấu & Nghệ thuật
                  </option>
                  <option value="the-thao">Thể thao</option>
                </select>
                <span className="error-message">
                  Vui lòng chọn thể loại sự kiện
                </span>
              </div>
              <div className="form-item event-item">
                <label>
                  Thời gian diễn ra sự kiện
                  <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="time"
                  id="event-time"
                  name="event-time"
                  placeholder="Thời gian diễn ra sự kiện"
                />
                <span className="error-message">
                  Vui lòng nhập thời gian diễn ra sự kiện
                </span>
              </div>
              <div className="form-item event-item">
                <label>
                  Giá vé<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  id="event-ticket-price"
                  name="event-ticket-price"
                  placeholder="Giá vé"
                />
                <span className="error-message">Vui lòng nhập giá vé</span>
              </div>
            </div>
          </div>
          <div style={{ marginTop: "30px", height: "100%" }}>
            <Space>
              <Button icon={<UndoOutlined />} />
              <Button icon={<RedoOutlined />} />
              <Button icon={<BoldOutlined />} />
              <Button icon={<FontSizeOutlined />} />
            </Space>
            <Flex>
              <TextArea showCount />
            </Flex>
          </div>
          <br></br>
          <br></br>
          <div className="form-group">
            {activeStep > 0 && (
              <button onClick={handlePrevious}>Quay lại</button>
            )}
            <button type="submit">Lưu thông tin</button>
            {activeStep < 2 && <button onClick={handleNext}>Tiếp theo</button>}
          </div>
        </div>
      )}

      {activeStep === 2 && (
        <div className="container-content">
          <h3 style={{ fontSize: "50px", textAlign: "center" }}>
            Thông tin thanh toán
          </h3>
          <div className="form-group">
            {activeStep > 0 && (
              <button onClick={handlePrevious}>Quay lại</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Form;
