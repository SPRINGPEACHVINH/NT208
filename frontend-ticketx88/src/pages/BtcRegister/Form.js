import React, { useState, useEffect } from "react";
import "../../styles/Form.css";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { RightOutlined, InboxOutlined, AuditOutlined } from "@ant-design/icons";
import { Upload, message } from "antd";
import { Editor } from "@tinymce/tinymce-react";
const { Dragger } = Upload;

async function addEventToDatabase(event) {
  const eventData = JSON.stringify(event);

  const response = await fetch(
    'http://localhost:8888/api/event/addhttp://localhost:8888/api/event/add',
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: eventData,
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

async function handleClick() {
  const event = {
    // khúc này code sao lấy dữ liệu của event bỏ dô đây theo dạng
    // EventId: "some-unique-id",
    // EventTime: new Date(),
    // EventInfo: "Event Information",
    // EventLocation: "Event Location",
    // EventCategory: "Event Category",
    // TicketPrice: 100,
    // Picture_event: "picture_string",
    // Logo_event: "logo_string",
    // Btc: "btc-object-id", // Cái này l Vinh set ngu lắm nên hỏi anh ruột đi ảnh cho cái Id rồi bỏ vô
  };

  try {
    const data = await addEventToDatabase(event);
    console.log(data);
  } catch (error) {
    console.log("There was an error!", error);
  }
}

function Form() {
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
    setIsMobile(window.innerWidth <= 768); // Định nghĩa ngưỡng chiều rộng cho điện thoại
  };

  const [activeStep, setActiveStep] = useState(0);
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handlePrevious = () => {
    setActiveStep(activeStep - 1);
  };

  // Hàm chuẩn hóa giá vé
  const [ticketPrice, setTicketPrice] = useState("");

  const formatPrice = (value) => {
    let numericValue = value.replace(/\D/g, "");
    let formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return formattedValue;
  };

  const handleInputChange = (e) => {
    setTicketPrice(formatPrice(e.target.value));
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
                    name="btc-name"
                    placeholder="Tên ban tổ chức"
                  />
                  <span className="error-message">
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
                    name="btc-information"
                    placeholder="Thông tin ban tổ chức"
                  />
                  <span className="error-message">
                    Vui lòng nhập Thông tin ban tổ chức
                  </span>
                </div>
              </div>
            </div>
          </div>

          <br />
          <br />

          <div className="form-group">
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
                <Datetime
                  timeFormat="HH:mm"
                  placeholder="Thời gian diễn ra sự kiện"
                  id="event-date-time"
                  name="event-date-time"
                  inputProps={{ readOnly: true, style: { boxShadow: "none" } }}
                />
                <span className="error-message">
                  Vui lòng nhập thời gian diễn ra sự kiện
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
                  <span className="error-message">Vui lòng nhập giá vé</span>
                </div>
              </div>
            </div>
          </div>
          <Editor
            apiKey="2ntmyt2jddbvu54ukb07kath10a3zwuwmg9v1yr8q2s4d243"
            init={{
              plugins:
                "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown",
              toolbar:
                "undo redo | blocks fontfamily fontsize | bold italic underline forecolor | image media | align | numlist bullist indent outdent | removeformat viewsource code",
              tinycomments_mode: "embedded",
              tinycomments_author: "Author name",
              ai_request: (request, respondWith) =>
                respondWith.string(() =>
                  Promise.reject("See docs to implement AI Assistant")
                ),
              menubar: false,
              branding: false,
            }}
          />
          <br></br>
          <br></br>
          <div className="form-group">
            {activeStep > 0 && (
              <button onClick={handlePrevious}>Quay lại</button>
            )}
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
            <button type="submit" onClick={handleClick}>
              Lưu thông tin
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Form;
