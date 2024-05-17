import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { Checkbox } from "antd";
import "../../styles/Register.css";

function onClick(e) {
  console.log(`checked = ${e.target.checked}`);
}
function Register() {
  return (
    <div className="sign-up">
      <span>Nhập email</span>
      <Input placeholder="Nhập email" prefix={<UserOutlined />} />
      <p></p>
      <span>Nhập Username</span>
      <Input placeholder="Nhập username" prefix={<UserOutlined />} />
      <p></p>
      <span>Nhập mật khẩu</span>
      <Input placeholder="Nhập mật khẩu" prefix={<UserOutlined />} />
      <p></p>
      <div className="term-of-use">
        <div>
          <Checkbox  className="checkbox" onClick={onClick}></Checkbox>
        </div>
        <p>Tôi đồng ý với Điều khoản sử dụng và Chính sách bảo mật của TicketX88 </p>

      </div>
      
      <div class="Continue-part">
        <button class="Continue-button" type="submit">
          Tiếp tục
        </button>
      </div>
    </div>
  );
}

export default Register;
