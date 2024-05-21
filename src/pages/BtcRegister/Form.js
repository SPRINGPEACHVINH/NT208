import React, { useState } from "react";
import "../../styles/Form.css";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { RightOutlined, InboxOutlined, AuditOutlined } from "@ant-design/icons";
import { Upload, message, Input } from "antd";

const { TextArea } = Input;
const { Dragger } = Upload;

function Form({ isMobile }) {
  // Upload logo btc
  const [fileListLogoBTC, setFileListLogoBTC] = useState([]);

  const handleChangeLogoBTC = ({ fileList }) => {
    const uploadedFile = fileList.find(
      (file) => !fileListLogoBTC.some((item) => item.uid === file.uid)
    );
    if (uploadedFile) {
      message.success("Tải ảnh lên thành công");
    }

    Promise.all(
      fileList.map(async (file) => {
        const base64 = await imageToBase64(file.originFileObj);
        return { ...file, base64 };
      })
    ).then((fileListBase64) => {
      setFileListLogoBTC(fileListBase64);
    });
  };

  const checkImageSizeLogoBTC = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const width = img.width;
          const height = img.height;
          if (width === 275 && height === 275) {
            resolve();
          } else {
            reject("Vui lòng tải ảnh ở kích thước 275x275");
            message.error("Vui lòng tải ảnh ở kích thước 275x275");
          }
        };
      };
      reader.readAsDataURL(file);
    });
  };

  const beforeUploadLogoBTC = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error(
        "Định dạng không phù hợp. Định dạng cho phép: jpeg, jpg, png."
      );
      return Upload.LIST_IGNORE;
    }

    return checkImageSizeLogoBTC(file)
      .then(() => file)
      .catch(() => {
        return Upload.LIST_IGNORE;
      });
  };

  // Upload cover event
  const [fileListCoverEvent, setFileListCoverEvent] = useState([]);

  const handleChangeCoverEvent = ({ fileList }) => {
    const uploadedFile = fileList.find(
      (file) => !fileListCoverEvent.some((item) => item.uid === file.uid)
    );
    if (uploadedFile) {
      message.success("Tải ảnh lên thành công");
    }

    Promise.all(
      fileList.map(async (file) => {
        const base64 = await imageToBase64(file.originFileObj);
        return { ...file, base64 };
      })
    ).then((fileListBase64) => {
      setFileListCoverEvent(fileListBase64);
    });
  };

  const checkImageSizeCoverEvent = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const width = img.width;
          const height = img.height;
          if (width === 1280 && height === 720) {
            resolve();
          } else {
            reject("Vui lòng tải ảnh ở kích thước 1280x720");
            message.error("Vui lòng tải ảnh ở kích thước 1280x720");
          }
        };
      };
      reader.readAsDataURL(file);
    });
  };

  const beforeUploadCoverEvent = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error(
        "Định dạng không phù hợp. Định dạng cho phép: jpeg, jpg, png."
      );
      return Upload.LIST_IGNORE;
    }

    return checkImageSizeCoverEvent(file)
      .then(() => file)
      .catch(() => {
        return Upload.LIST_IGNORE;
      });
  };

  // Upload logo event
  const [fileListLogoEvent, setFileListLogoEvent] = useState([]);

  const handleChangeLogoEvent = ({ fileList }) => {
    const uploadedFile = fileList.find(
      (file) => !fileListLogoEvent.some((item) => item.uid === file.uid)
    );
    if (uploadedFile) {
      message.success("Tải ảnh lên thành công");
    }

    Promise.all(
      fileList.map(async (file) => {
        const base64 = await imageToBase64(file.originFileObj);
        return { ...file, base64 };
      })
    ).then((fileListBase64) => {
      setFileListLogoEvent(fileListBase64);
    });
  };

  const checkImageSizeLogoEvent = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const width = img.width;
          const height = img.height;
          if (width === 720 && height === 958) {
            resolve();
          } else {
            reject("Vui lòng tải ảnh ở kích thước 720x958");
            message.error("Vui lòng tải ảnh ở kích thước 720x958");
          }
        };
      };
      reader.readAsDataURL(file);
    });
  };

  const beforeUploadLogoEvent = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error(
        "Định dạng không phù hợp. Định dạng cho phép: jpeg, jpg, png."
      );
      return Upload.LIST_IGNORE;
    }

    return checkImageSizeLogoEvent(file)
      .then(() => file)
      .catch(() => {
        return Upload.LIST_IGNORE;
      });
  };

  // Hàm chuyển đổi ảnh sang base64
  const imageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Hàm render item ảnh
  const renderItem = (originNode, file) => {
    return (
      <div className="image-item">
        <img
          src={file.base64}
          alt={"Uploaded"}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </div>
    );
  };

  // Hàm chuẩn hóa giá vé
  const [ticketPrice, setTicketPrice] = useState("");

  const formatPrice = (value) => {
    let numericValue = value.replace(/\D/g, "");
    let formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return formattedValue;
  };

  const handleInputChange = (e) => {
    const formattedValue = formatPrice(e.target.value);
    setTicketPrice(formattedValue);
    handleInputEventChange({
      target: { name: "eventTicketPrice", value: formattedValue },
    });
  };

  // Hàm xử lý form và hàm xử lý chuyển step
  const [formData, setFormData] = useState({
    enterpriseName: "",
    enterpriseNumberBusiness: "",
    enterprisePhone: "",
    enterpriseEmail: "",
    enterpriseAddress: "",
    btcName: "",
    btcInformation: "",
  });

  const [formErrors, setFormErrors] = useState({
    enterpriseName: false,
    enterpriseNumberBusiness: false,
    enterprisePhone: false,
    enterpriseEmail: false,
    enterpriseAddress: false,
    btcName: false,
    btcInformation: false,
  });

  const handleInputFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    setFormErrors((prevFormErrors) => ({
      ...prevFormErrors,
      [name]: value.trim() === "",
    }));
  };

  const [eventData, setEventData] = useState({
    eventName: "",
    eventType: "",
    eventDateTime: "",
    eventTicketPrice: "",
    eventDecsription: "",
  });

  const [eventErrors, setEventErrors] = useState({
    eventName: false,
    eventType: false,
    eventDateTime: false,
    eventTicketPrice: false,
    eventDecsription: false,
  });

  const handleInputEventChange = (e, name) => {
    let targetName, targetValue;

    if (e && e.target) {
      targetName = e.target.name;
      targetValue = e.target.value;
    } else {
      targetName = name;
      targetValue = e;
    }

    setEventData((prevEventData) => ({
      ...prevEventData,
      [targetName]: targetValue,
    }));

    setEventErrors((prevEventErrors) => ({
      ...prevEventErrors,
      [targetName]:
        typeof targetValue === "string"
          ? targetValue.trim() === ""
          : !targetValue,
    }));
  };

  const [activeStep, setActiveStep] = useState(0);
  const [errorMessageVisible, setErrorMessageVisible] = useState(false);
  const handleFormNext = () => {
    const newErrors = { ...formErrors };
    let hasError = false;

    for (const key in formData) {
      if (formData[key].trim() === "") {
        newErrors[key] = true;
        hasError = true;
      } else {
        newErrors[key] = false;
      }
    }

    setFormErrors(newErrors);

    if (
      hasError &&
      Object.values(formData).every((value) => value.trim() === "")
    ) {
      setErrorMessageVisible(true);
    }

    if (!hasError) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleEventNext = () => {
    const newErrors = { ...eventErrors };
    let hasError = false;

    for (const key in eventData) {
      const value = eventData[key];

      // Kiểm tra nếu value là chuỗi
      if (typeof value === "string") {
        if (value.trim() === "") {
          newErrors[key] = true;
          hasError = true;
        } else {
          newErrors[key] = false;
        }
      } else {
        if (!value) {
          newErrors[key] = true;
          hasError = true;
        } else {
          newErrors[key] = false;
        }
      }
    }

    setEventErrors(newErrors);

    if (
      hasError &&
      Object.values(eventData).every((value) => value.trim() === "")
    ) {
      setErrorMessageVisible(true);
    }

    if (!hasError) {
      setActiveStep(activeStep + 1);
    }
  };

  const handlePrevious = () => {
    setActiveStep(activeStep - 1);
  };

  const renderStep = (stepNumber, title) => {
    return (
      <div
        className={`ant-steps-item ${
          activeStep === stepNumber
            ? "ant-steps-item-active"
            : "ant-steps-item-wait"
        }`}
      >
        <div className="ant-steps-item-icon">{stepNumber + 1}</div>
        <div className="ant-steps-item-title">{title}</div>
      </div>
    );
  };

  return (
    <div>
      <div className="container-step">
        {!isMobile && (
          <>
            {/* step 1 */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                position: "relative",
              }}
            >
              {renderStep(0, "Đăng ký ban tổ chức")}
              <RightOutlined className="ant-steps-item-right-icon" />
            </div>
            {/* step 2 */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                margin: "0 10%",
                position: "relative",
              }}
            >
              {activeStep > 0 ? (
                renderStep(1, "Thông tin sự kiện")
              ) : (
                <div className="ant-steps-item ant-steps-item-wait">
                  <div className="ant-steps-item-icon">2</div>
                  <div className="ant-steps-item-title">Thông tin sự kiện</div>
                </div>
              )}
              <RightOutlined className="ant-steps-item-right-icon" />
            </div>
            {/* step 3 */}
            <div style={{ display: "flex", flexDirection: "row" }}>
              {activeStep > 1 ? (
                renderStep(2, "Thông tin thanh toán")
              ) : (
                <div className="ant-steps-item ant-steps-item-wait">
                  <div className="ant-steps-item-icon">3</div>
                  <div className="ant-steps-item-title">
                    Thông tin thanh toán
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {isMobile && (
          <>
            <div
              className={`ant-steps-icon ${
                activeStep === 0
                  ? "ant-steps-icon-active"
                  : "ant-steps-icon-wait"
              }`}
            >
              <AuditOutlined className="ant-steps-item-audio-icon" />
            </div>
            <div
              className={`ant-steps-icon ${
                activeStep === 1
                  ? "ant-steps-icon-active"
                  : "ant-steps-icon-wait"
              }`}
            >
              <AuditOutlined className="ant-steps-item-audio-icon" />
            </div>
            <div
              className={`ant-steps-icon ${
                activeStep === 2
                  ? "ant-steps-icon-active"
                  : "ant-steps-icon-wait"
              }`}
            >
              <AuditOutlined className="ant-steps-item-audio-icon" />
            </div>
          </>
        )}
      </div>

      {activeStep === 0 && (
        <div className="container-content">
          <div
            style={{
              fontSize: "35px",
              textAlign: "center",
              fontWeight: "bold",
              marginBottom: "20px",
            }}
          >
            Đăng ký ban tổ chức
          </div>
          <div className="container-form-organizer">
            <div className="form-group">
              <div className="form-item">
                <label>
                  Tên doanh nghiệp<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  id="enterprise-name"
                  name="enterpriseName"
                  placeholder="Tên doanh nghiệp"
                  value={formData.enterpriseName}
                  onChange={handleInputFormChange}
                />
                <span
                  className={`error-message ${
                    formErrors.enterpriseName && errorMessageVisible
                      ? "show"
                      : ""
                  }`}
                >
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
                  name="enterpriseNumberBusiness"
                  placeholder="Mã số đăng ký kinh doanh"
                  value={formData.enterpriseNumberBusiness}
                  onChange={handleInputFormChange}
                />
                <span
                  className={`error-message ${
                    formErrors.enterpriseNumberBusiness && errorMessageVisible
                      ? "show"
                      : ""
                  }`}
                >
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
                  name="enterprisePhone"
                  placeholder="Số điện thoại"
                  maxLength="10"
                  onInput={(e) =>
                    (e.target.value = e.target.value
                      .replace(/[^0-9]/g, "")
                      .slice(0, 10))
                  }
                  value={formData.enterprisePhone}
                  onChange={handleInputFormChange}
                />
                <span
                  className={`error-message ${
                    formErrors.enterprisePhone && errorMessageVisible
                      ? "show"
                      : ""
                  }`}
                >
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
                  name="enterpriseEmail"
                  placeholder="Email"
                  value={formData.enterpriseEmail}
                  onChange={handleInputFormChange}
                />
                <span
                  className={`error-message ${
                    formErrors.enterpriseEmail && errorMessageVisible
                      ? "show"
                      : ""
                  }`}
                >
                  Vui lòng nhập email
                </span>
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
                  name="enterpriseAddress"
                  placeholder="Địa chỉ trụ sở"
                  value={formData.enterpriseAddress}
                  onChange={handleInputFormChange}
                />
                <span
                  className={`error-message ${
                    formErrors.enterpriseAddress && errorMessageVisible
                      ? "show"
                      : ""
                  }`}
                >
                  Vui lòng nhập địa chỉ trụ sở
                </span>
              </div>
            </div>
            <div className="container-form-btc">
              <Dragger
                maxCount={1}
                listType="picture-card"
                className="ant-container-drag-upload-logo-btc"
                fileList={fileListLogoBTC}
                onChange={handleChangeLogoBTC}
                beforeUpload={beforeUploadLogoBTC}
                itemRender={renderItem}
              >
                {fileListLogoBTC.length === 0 && (
                  <div>
                    <p className="ant-upload-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Thêm logo ban tổ chức</p>
                    <p className="ant-upload-hint">(275x275)</p>
                  </div>
                )}
              </Dragger>
              <div className="form-group-btc">
                <div className="form-item btc-item">
                  <label>
                    Tên ban tổ chức<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    id="btc-name"
                    name="btcName"
                    placeholder="Tên ban tổ chức"
                    value={formData.btcName}
                    onChange={handleInputFormChange}
                  />
                  <span
                    className={`error-message ${
                      formErrors.btcName && errorMessageVisible ? "show" : ""
                    }`}
                  >
                    Vui lòng nhập tên ban tổ chức
                  </span>
                </div>
                <div className="form-item btc-item">
                  <label>
                    Thông tin ban tổ chức<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    id="btc-information"
                    name="btcInformation"
                    placeholder="Thông tin ban tổ chức"
                    value={formData.btcInformation}
                    onChange={handleInputFormChange}
                  />
                  <span
                    className={`error-message ${
                      formErrors.btcInformation && errorMessageVisible
                        ? "show"
                        : ""
                    }`}
                  >
                    Vui lòng nhập thông tin ban tổ chức
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="form-group-button">
            {activeStep < 2 && (
              <button onClick={handleFormNext} type="button">
                Tiếp theo
              </button>
            )}
          </div>
        </div>
      )}

      {activeStep === 1 && (
        <div className="container-content">
          <div
            style={{
              fontSize: "35px",
              textAlign: "center",
              fontWeight: "bold",
              marginBottom: "20px",
            }}
          >
            Thông tin sự kiện
          </div>
          <Dragger
            maxCount={1}
            listType="picture-card"
            className="ant-container-drag-upload-cover-event"
            onChange={handleChangeCoverEvent}
            beforeUpload={beforeUploadCoverEvent}
            fileList={fileListCoverEvent}
            itemRender={renderItem}
          >
            {fileListCoverEvent.length === 0 && (
              <div>
                <p className="ant-upload-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Thêm ảnh nền sự kiện</p>
                <p className="ant-upload-hint">(1280x720)</p>
              </div>
            )}
          </Dragger>
          <div className="container-form-event">
            <Dragger
              maxCount={1}
              listType="picture-card"
              className="ant-container-drag-upload-logo-event"
              fileList={fileListLogoEvent}
              onChange={handleChangeLogoEvent}
              beforeUpload={beforeUploadLogoEvent}
              itemRender={renderItem}
            >
              {fileListLogoEvent.length === 0 && (
                <div>
                  <p className="ant-upload-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">Thêm logo sự kiện</p>
                  <p className="ant-upload-hint">(720x958)</p>
                </div>
              )}
            </Dragger>
            <div className="form-group-event">
              <div className="form-item event-item">
                <label>
                  Tên sự kiện<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  id="event-name"
                  name="eventName"
                  placeholder="Tên sự kiện"
                  value={eventData.eventName}
                  onChange={handleInputEventChange}
                />
                <span
                  className={`error-message ${
                    eventErrors.eventName && errorMessageVisible ? "show" : ""
                  }`}
                >
                  Vui lòng nhập tên sự kiện
                </span>
              </div>
              <div className="form-item event-item">
                <label>
                  Thể loại sự kiện<span style={{ color: "red" }}>*</span>
                </label>
                <select
                  id="event-type"
                  name="eventType"
                  value={eventData.eventType}
                  onChange={handleInputEventChange}
                >
                  <option value="" disabled selected hidden>
                    Vui lòng chọn
                  </option>
                  <option value="nhac-song">Nhạc sống</option>
                  <option value="san-khau-va-nghe-thuat">
                    Sân khấu & Nghệ thuật
                  </option>
                  <option value="the-thao">Thể thao</option>
                </select>
                <span
                  className={`error-message ${
                    eventErrors.eventType && errorMessageVisible ? "show" : ""
                  }`}
                >
                  Vui lòng chọn thể loại sự kiện
                </span>
              </div>
              <div className="form-item event-item">
                <label>
                  Thời gian diễn ra sự kiện
                  <span style={{ color: "red" }}>*</span>
                </label>
                <Datetime
                  timeFormat="HH:mm"
                  placeholder="Thời gian diễn ra sự kiện"
                  id="event-date-time"
                  name="eventDateTime"
                  value={eventData.eventDateTime}
                  onChange={(value) =>
                    handleInputEventChange(value, "eventDateTime")
                  }
                  inputProps={{ readOnly: true, style: { boxShadow: "none" } }}
                />
                <span
                  className={`error-message ${
                    eventErrors.eventDateTime && errorMessageVisible
                      ? "show"
                      : ""
                  }`}
                >
                  Vui lòng chọn thời gian diễn ra sự kiện
                </span>
              </div>
              <div className="form-item event-item">
                <label>
                  Giá vé<span style={{ color: "red" }}>*</span>
                </label>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    position: "relative",
                  }}
                >
                  <input
                    type="text"
                    id="event-ticket-price"
                    name="event-ticket-price"
                    placeholder="Giá vé"
                    value={ticketPrice}
                    onChange={handleInputChange}
                  />
                  <span className="currency">VNĐ</span>
                </div>
                <span
                  className={`error-message ${
                    eventErrors.eventTicketPrice && errorMessageVisible
                      ? "show"
                      : ""
                  }`}
                >
                  Vui lòng nhập giá vé
                </span>
              </div>
            </div>
          </div>
          <TextArea
            showCount
            placeholder="Thông tin sự kiện"
            style={{ height: "300px" }}
            name="eventDecsription"
            value={eventData.eventDecsription}
            onChange={handleInputEventChange}
          />
          <span
            className={`error-message ${
              eventErrors.eventDecsription && errorMessageVisible ? "show" : ""
            }`}
          >
            Vui lòng nhập thông tin sự kiện
          </span>
          <div className="form-group-button">
            {activeStep > 0 && (
              <button onClick={handlePrevious}>Quay lại</button>
            )}
            {activeStep < 2 && (
              <button onClick={handleEventNext}>Tiếp theo</button>
            )}
          </div>
        </div>
      )}

      {activeStep === 2 && (
        <div className="container-content">
          <div
            style={{
              fontSize: "35px",
              textAlign: "center",
              fontWeight: "bold",
              marginBottom: "20px",
            }}
          >
            Thông tin thanh toán
          </div>

          <div className="form-group-button">
            {activeStep > 0 && (
              <button onClick={handlePrevious}>Quay lại</button>
            )}
            <button type="submit">Lưu thông tin</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Form;
