import React, { useState } from "react";
import "../styles/Form.css";

function Form() {
  const [businessType, setBusinessType] = useState("enterprise");

  const showBusinessType = (event) => {
    setBusinessType(event.target.value);
  };

  return (
    <div className="container-content">
      <h1 style={{ textAlign: "center", marginTop: "10px" }}>
        Đơn đăng ký ban tổ chức
      </h1>
      <div className="container-basic-information">
        <div className="form-group">
          <div className="form-item">
            <label>
              Loại hình kinh doanh<span style={{ color: "red" }}>*</span>
            </label>
            <select
              id="business-type"
              name="business-type"
              value={businessType}
              onChange={showBusinessType}
            >
              <option value="enterprise">Doanh nghiệp/Nhà tổ chức</option>
              <option value="personal">Cá nhân</option>
            </select>
          </div>
        </div>
      </div>

      {businessType === "personal" && (
        <form id="personal-business">
          <h3 style={{ fontSize: "25px" }}>Thông tin cơ bản</h3>
          <div className="container-basic-information">
            <div className="form-group">
              <div className="form-item">
                <label>
                  Họ và tên<span style={{ color: "red" }}>*</span>
                </label>
                <input type="text" id="personal-name" name="personal-name" />
                <span className="error-message">Vui lòng nhập họ tên</span>
              </div>
              <div className="form-item">
                <label>
                  Email<span style={{ color: "red" }}>*</span>
                </label>
                <input type="email" id="personal-email" name="personal-email" />
                <span className="error-message">Vui lòng nhập email</span>
              </div>
            </div>

            <div className="form-group">
              <div className="form-item">
                <label>
                  Số điện thoại<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="tel"
                  id="personal-phone"
                  name="personal-phone"
                  maxLength="10"
                />
                <span className="error-message">
                  Vui lòng nhập số điện thoại
                </span>
              </div>
              <div className="form-item">
                <label>
                  Số CCCD<span style={{ color: "red" }}>*</span>
                </label>
                <input type="text" id="personal-id" name="personal-id" />
                <span className="error-message">Vui lòng nhập số CCCD</span>
              </div>
            </div>

            <div className="form-group">
              <div className="form-item" id="item-special">
                <label>
                  Mã số thuế<span style={{ color: "red" }}>*</span>
                </label>
                <input type="number" id="personal-tax" name="personal-tax" />
                <span className="error-message">Vui lòng nhập mã số thuế</span>
              </div>
            </div>
          </div>
          <h3 style={{ fontSize: "25px" }}>Địa chỉ thường trú</h3>
          <div className="container-basic-information">
            <div className="form-group">
              <div className="form-item">
                <label>
                  Tỉnh/Thành<span style={{ color: "red" }}>*</span>
                </label>
                <select
                  id="personal-city-list"
                  name="personal-city-list"
                ></select>
                <span className="error-message">Vui lòng chọn tỉnh/thành</span>
              </div>
              <div className="form-item">
                <label>
                  Quận/Huyện<span style={{ color: "red" }}>*</span>
                </label>
                <select
                  id="personal-district-list"
                  name="personal-district-list"
                  disabled
                ></select>
                <span className="error-message">Vui lòng chọn quận/huyện</span>
              </div>
            </div>

            <div className="form-group">
              <div className="form-item">
                <label>
                  Phường/Xã<span style={{ color: "red" }}>*</span>
                </label>
                <select
                  id="personal-ward-list"
                  name="personal-ward-list"
                  disabled
                ></select>
                <span className="error-message">Vui lòng chọn phường/xã</span>
              </div>
              <div className="form-item">
                <label>
                  Địa chỉ<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  id="personal-address"
                  name="personal-address"
                  disabled
                />
                <span className="error-message">Vui lòng nhập địa chỉ</span>
              </div>
            </div>
          </div>
          <br></br>
          <br></br>
          <div className="form-group">
            <button type="submit">Lưu thông tin</button>
          </div>
        </form>
      )}

      {businessType === "enterprise" && (
        <form id="enterprise-business">
          <h3 style={{ fontSize: "25px" }}>Thông tin cơ bản</h3>
          <div className="container-basic-information">
            <div className="form-group">
              <div className="form-item">
                <label>
                  Tên doanh nghiệp<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  id="enterprise-name"
                  name="enterprise-name"
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
                  type="number"
                  id="enterprise-number-business"
                  name="enterprise-number-business"
                />
                <span className="error-message">
                  Vui lòng nhập mã số đăng ký kinh doanh
                </span>
              </div>
            </div>

            <div className="form-group">
              <div className="form-item">
                <label>
                  Nơi cấp<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  id="enterprise-place-of-issue"
                  name="enterprise-place-of-issue"
                />
                <span className="error-message">Vui lòng nhập nơi cấp</span>
              </div>
              <div className="form-item">
                <label>
                  Ngày cấp<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  id="enterprise-day-of-issue"
                  name="enterprise-day-of-issue"
                />
                <span className="error-message">Vui lòng nhập ngày cấp</span>
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
                  maxLength="10"
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
                />
                <span className="error-message">Vui lòng nhập email</span>
              </div>
            </div>
          </div>
          <h3 style={{ fontSize: "25px" }}>Địa chỉ trụ sở</h3>
          <div className="container-basic-information">
            <div className="form-group">
              <div className="form-item">
                <label>
                  Tỉnh/Thành<span style={{ color: "red" }}>*</span>
                </label>
                <select
                  id="enterprise-city-list"
                  name="enterprise-city-list"
                ></select>
                <span className="error-message">Vui lòng chọn tỉnh/thành</span>
              </div>
              <div className="form-item">
                <label>
                  Quận/Huyện<span style={{ color: "red" }}>*</span>
                </label>
                <select
                  id="enterprise-district-list"
                  name="enterprise-district-list"
                  disabled
                ></select>
                <span className="error-message">Vui lòng chọn quận/huyện</span>
              </div>
            </div>

            <div className="form-group">
              <div className="form-item">
                <label>
                  Phường/Xã<span style={{ color: "red" }}>*</span>
                </label>
                <select
                  id="enterprise-ward-list"
                  name="enterprise-ward-list"
                  disabled
                ></select>
                <span className="error-message">Vui lòng chọn phường/xã</span>
              </div>
              <div className="form-item">
                <label>
                  Địa chỉ<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  id="enterprise-address"
                  name="enterprise-address"
                  disabled
                />
                <span className="error-message">Vui lòng nhập địa chỉ</span>
              </div>
            </div>
          </div>
          <br></br>
          <br></br>
          <div className="form-group">
            <button type="submit">Lưu thông tin</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Form;
