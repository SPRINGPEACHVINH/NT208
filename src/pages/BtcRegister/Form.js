import React, { useState } from "react";
import "../../styles/Form.css";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import {
  RightOutlined,
  InboxOutlined,
  AuditOutlined,
  CheckCircleOutlined,
  BarsOutlined,
  BankOutlined,
} from "@ant-design/icons";
import { Upload, message, Input, Modal } from "antd";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;
const { Dragger } = Upload;

function Form({ username, isMobile }) {
  // Upload logo btc
  const [fileListLogoBTC, setFileListLogoBTC] = useState([]);
  const [uploadErrorLogoBTC, setUploadErrorLogoBTC] = useState(false);

  const handleChangeLogoBTC = ({ fileList }) => {
    const uploadedFile = fileList.find(
      (file) => !fileListLogoBTC.some((item) => item.uid === file.uid)
    );
    if (uploadedFile) {
      message.success("Tải ảnh lên thành công");
      setUploadErrorLogoBTC(false);
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
  const [uploadErrorCoverEvent, setUploadErrorCoverEvent] = useState(false);

  const handleChangeCoverEvent = ({ fileList }) => {
    const uploadedFile = fileList.find(
      (file) => !fileListCoverEvent.some((item) => item.uid === file.uid)
    );
    if (uploadedFile) {
      message.success("Tải ảnh lên thành công");
      setUploadErrorCoverEvent(false);
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
    const formattedValue =
      name === "enterprisePhone"
        ? value.replace(/[^0-9]/g, "").slice(0, 10)
        : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: formattedValue,
    }));

    setFormErrors((prevFormErrors) => ({
      ...prevFormErrors,
      [name]:
        formattedValue.trim() === "" ||
        (name === "enterprisePhone" && formattedValue.length !== 10),
    }));
  };

  const [eventData, setEventData] = useState({
    eventName: "",
    eventType: "",
    eventDateTime: "",
    eventTicketPrice: "",
    eventDescription: "",
    eventNumberTicket: "",
    eventLinkVideo: "",
  });

  const [eventErrors, setEventErrors] = useState({
    eventName: false,
    eventType: false,
    eventDateTime: false,
    eventTicketPrice: false,
    eventDescription: false,
    eventNumberTicket: false,
    eventLinkVideo: false,
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

    if (
      targetName === "eventNumberTicket" ||
      targetName === "eventTicketPrice"
    ) {
      targetValue = targetValue.replace(/[^0-9]/g, "");
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
  const [canShowMessage, setCanShowMessage] = useState(true);
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

    if (formData.enterprisePhone.trim().length !== 10) {
      newErrors.enterprisePhone = true;
      hasError = true;
    }

    const emailRegex = /^[^\s@]+@gmail\.com$/;
    const isValidEmail = emailRegex.test(formData.enterpriseEmail);
    if (!isValidEmail) {
      newErrors.enterpriseEmail = true;
      hasError = true;
    }

    setFormErrors(newErrors);

    if (
      hasError ||
      Object.values(formData).every((value) => value.trim() === "") ||
      fileListLogoBTC.length === 0
    ) {
      if (canShowMessage) {
        if (fileListLogoBTC.length === 0) {
          setUploadErrorLogoBTC(true);
        }
        setCanShowMessage(false);
        message.error("Vui lòng nhập đầy đủ thông tin");
        setTimeout(() => setCanShowMessage(true), 500);
      }
    }

    if (!hasError && fileListLogoBTC.length > 0) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleEventNext = () => {
    const newErrors = { ...eventErrors };
    let hasError = false;

    for (const key in eventData) {
      const value = eventData[key];
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

    const embedLinkPattern =
      /^(https:\/\/www\.youtube\.com\/embed\/|https:\/\/player\.vimeo\.com\/video\/)/;
    if (!embedLinkPattern.test(eventData.eventLinkVideo)) {
      newErrors.eventLinkVideo = true;
      hasError = true;
    }

    setEventErrors(newErrors);

    if (
      hasError ||
      Object.values(eventData).every((value) => value.trim() === "") ||
      fileListCoverEvent.length === 0
    ) {
      if (canShowMessage) {
        if (fileListCoverEvent.length === 0) {
          setUploadErrorCoverEvent(true);
        }
        setCanShowMessage(false);
        message.error("Vui lòng nhập đầy đủ thông tin");
        setTimeout(() => setCanShowMessage(true), 500);
      }
    }

    if (!hasError && fileListCoverEvent.length > 0) {
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

  // Hàm lưu thông tin
  const [modalVisible, setModalVisible] = useState(false);

  const handleSave = async () => {
    try {
      const userResponse = await fetch(
        "https://nt208.onrender.com/api/user/get-details/" + username
      );

      if (!userResponse.ok) {
        throw new Error("Failed to fetch user details.");
      }
      const userData = await userResponse.json();
      const userId = userData.data._id;

      // Save BTC
      const {
        enterpriseName,
        enterpriseNumberBusiness,
        enterprisePhone,
        enterpriseEmail,
        enterpriseAddress,
        btcName,
        btcInformation,
      } = formData;

      const btcResponse = await fetch(
        "https://nt208.onrender.com/api/btc/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            BtcId: enterpriseNumberBusiness,
            BtcName: btcName,
            BtcInfo: btcInformation,
            EnterpriseName: enterpriseName,
            Email: enterpriseEmail,
            PhoneNumber: enterprisePhone,
            BtcAddress: enterpriseAddress,
            Logo_btc: fileListLogoBTC[0].base64,
            User: userId,
          }),
        }
      );

      if (!btcResponse.ok) {
        const errorData = await btcResponse.json();
        console.error("Error details:", errorData);
        throw new Error(
          `Failed to save BTC: ${errorData.message || "Unknown error"}`
        );
      }
      const btcData = await btcResponse.json();
      const btcId = btcData.data._id;
      console.log(btcData);

      // Save event
      const lastEventResponse = await fetch(
        "https://nt208.onrender.com/api/event/last"
      );
      if (!lastEventResponse.ok) {
        throw new Error("Failed to fetch last event ID.");
      }

      const lastEvent = await lastEventResponse.json();
      const lastEventId = lastEvent.data.EventId;

      let newEventId = "EV0";
      if (lastEventId) {
        const matches = lastEventId.match(/\d+$/);
        if (matches) {
          const lastNumber = parseInt(matches[0], 10);
          newEventId = "EV" + (lastNumber + 1);
        }
      }

      const {
        eventName,
        eventDateTime,
        eventDescription,
        eventType,
        eventTicketPrice,
      } = eventData;

      const eventResponse = await fetch(
        "https://nt208.onrender.com/api/event/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            EventId: newEventId,
            EventName: eventName,
            EventTime: eventDateTime,
            EventInfo: eventDescription,
            EventLocation: "TicketX88",
            EventCategory: eventType,
            TicketPrice: eventTicketPrice,
            Picture_event: fileListCoverEvent[0].base64,
            VideoPath: "chuaco",
            Btc: btcId,
          }),
        }
      );

      if (!eventResponse.ok) {
        const errorData = await eventResponse.json();
        console.error("Error details:", errorData);
        throw new Error(
          `Failed to save event: ${errorData.message || "Unknown error"}`
        );
      }
      const data = await eventResponse.json();
      console.log(data);

      setModalVisible(true);
    } catch (error) {
      console.error("Failed to save event:", error);
    }
  };

  const navigate = useNavigate();
  const handleModalOk = () => {
    setModalVisible(false);
    navigate("/Events");
  };

  // Hàm kiểm tra ngày hợp lệ
  const isValidDate = (current) => {
    return current.isAfter(Datetime.moment().subtract(1, "day"));
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
          <div className="ant-steps-container">
            <div
              className={`ant-steps-icon ${
                activeStep === 0
                  ? "ant-steps-icon-active"
                  : "ant-steps-icon-wait"
              }`}
            >
              <AuditOutlined className="ant-icon" />
            </div>
            <div className="line" />
            <div
              className={`ant-steps-icon ${
                activeStep === 1
                  ? "ant-steps-icon-active"
                  : "ant-steps-icon-wait"
              }`}
            >
              <BarsOutlined className="ant-icon" />
            </div>
            <div className="line" />
            <div
              className={`ant-steps-icon ${
                activeStep === 2
                  ? "ant-steps-icon-active"
                  : "ant-steps-icon-wait"
              }`}
            >
              <BankOutlined className="ant-icon" />
            </div>
          </div>
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
                    formErrors.enterpriseName ? "show" : ""
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
                    formErrors.enterpriseNumberBusiness ? "show" : ""
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
                  value={formData.enterprisePhone}
                  onChange={handleInputFormChange}
                />
                <span
                  className={`error-message ${
                    formErrors.enterprisePhone ? "show" : ""
                  }`}
                >
                  {formData.enterprisePhone.trim() === ""
                    ? "Vui lòng nhập số điện thoại"
                    : formErrors.enterprisePhone
                    ? "Vui lòng nhập đúng số điện thoại (10 số)"
                    : ""}
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
                    formErrors.enterpriseEmail ? "show" : ""
                  }`}
                >
                  {formData.enterpriseEmail.trim() === ""
                    ? "Vui lòng nhập email"
                    : formErrors.enterpriseEmail
                    ? "Vui lòng nhập đúng định dạng email"
                    : ""}
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
                    formErrors.enterpriseAddress ? "show" : ""
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
                <span
                  style={{
                    position: "absolute",
                    left: "0",
                    bottom: "-25px",
                  }}
                  className={`error-message ${
                    uploadErrorLogoBTC ? "show" : ""
                  }`}
                >
                  Vui lòng tải ảnh logo ban tổ chức
                </span>
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
                      formErrors.btcName ? "show" : ""
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
                      formErrors.btcInformation ? "show" : ""
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
            <span
              style={{
                position: "absolute",
                left: "0",
                bottom: "-25px",
              }}
              className={`error-message ${uploadErrorCoverEvent ? "show" : ""}`}
            >
              Vui lòng tải ảnh nền sự kiện
            </span>
          </Dragger>
          <div className="form-group">
            <div className="form-item">
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
                  eventErrors.eventName ? "show" : ""
                }`}
              >
                Vui lòng nhập tên sự kiện
              </span>
            </div>
            <div className="form-item">
              <label>
                Thể loại sự kiện<span style={{ color: "red" }}>*</span>
              </label>
              <select
                id="event-type"
                name="eventType"
                value={eventData.eventType}
                onChange={handleInputEventChange}
                className="select-event-type"
                style={{
                  color: eventData.eventType ? "black" : "rgb(89,92,95)",
                }}
              >
                <option value="" disabled selected hidden>
                  Vui lòng chọn
                </option>
                <option value="Nhạc sống">Nhạc sống</option>
                <option value="Sân khấu & Nghệ thuật">
                  Sân khấu & Nghệ thuật
                </option>
                <option value="Thể thao">Thể thao</option>
              </select>
              <span
                className={`error-message ${
                  eventErrors.eventType ? "show" : ""
                }`}
              >
                Vui lòng chọn thể loại sự kiện
              </span>
            </div>
          </div>
          <div className="form-group">
            <div className="form-item">
              <label>
                Thời gian diễn ra sự kiện
                <span style={{ color: "red" }}>*</span>
              </label>
              <Datetime
                timeFormat="HH:mm"
                dateFormat="DD/MM/YYYY"
                id="event-date-time"
                name="eventDateTime"
                value={eventData.eventDateTime}
                onChange={(value) =>
                  handleInputEventChange(value, "eventDateTime")
                }
                inputProps={{
                  placeholder: "Thời gian diễn ra sự kiện",
                  readOnly: true,
                  style: { boxShadow: "none" },
                }}
                isValidDate={isValidDate}
              />
              <span
                className={`error-message ${
                  eventErrors.eventDateTime ? "show" : ""
                }`}
              >
                Vui lòng chọn thời gian diễn ra sự kiện
              </span>
            </div>
            <div className="form-item">
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
                  name="eventTicketPrice"
                  placeholder="Giá vé"
                  value={eventData.eventTicketPrice}
                  onChange={(e) =>
                    handleInputEventChange(e, "eventTicketPrice")
                  }
                />
                <span className="currency">VNĐ</span>
              </div>
              <span
                className={`error-message ${
                  eventErrors.eventTicketPrice ? "show" : ""
                }`}
              >
                Vui lòng nhập giá vé
              </span>
            </div>
          </div>
          <div className="form-group">
            <div className="form-item">
              <label>
                Số lượng vé<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                id="event-number-ticket"
                name="eventNumberTicket"
                placeholder="Số lượng vé"
                value={eventData.eventNumberTicket}
                onChange={handleInputEventChange}
              />
              <span
                className={`error-message ${
                  eventErrors.eventNumberTicket ? "show" : ""
                }`}
              >
                Vui lòng nhập số lượng vé
              </span>
            </div>
            <div className="form-item">
              <label>
                Link video<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                id="event-link-video"
                name="eventLinkVideo"
                placeholder="Link video"
                value={eventData.eventLinkVideo}
                onChange={handleInputEventChange}
              />
              <span
                className={`error-message ${
                  eventErrors.eventLinkVideo ? "show" : ""
                }`}
              >
                {eventData.eventLinkVideo.trim() === ""
                  ? "Vui lòng nhập link video"
                  : eventErrors.eventLinkVideo
                  ? "Vui lòng nhập link video dạng embed"
                  : ""}
              </span>
            </div>
          </div>
          <TextArea
            showCount
            placeholder="Thông tin sự kiện"
            style={{ height: "300px" }}
            name="eventDescription"
            value={eventData.eventDescription}
            onChange={handleInputEventChange}
          />
          <span
            className={`error-message ${
              eventErrors.eventDescription ? "show" : ""
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
        <>
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
              <button type="submit" onClick={handleSave}>
                Lưu thông tin
              </button>
            </div>
          </div>
          <Modal
            title="Đăng ký thành công"
            open={modalVisible}
            onOk={handleModalOk}
          >
            <div style={{ textAlign: "center" }}>
              <CheckCircleOutlined
                style={{ fontSize: "50px", color: "orangered" }}
              />
            </div>
            <div style={{ textAlign: "center", marginTop: "10px" }}>
              Thông tin của bạn đã được lưu thành công
            </div>
          </Modal>
        </>
      )}
    </div>
  );
}

export default Form;
