import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { Checkbox } from "antd";
import "../../styles/Register.css";

function onChange(e) {
  console.log(`checked = ${e.target.checked}`);
}
function Register() {
  return (
    <div class="sign-up">
      <p>Nhập email</p>
      <Input placeholder="Nhập email" prefix={<UserOutlined />} />
      <p>Nhập username</p>
      <Input placeholder="Nhập username" prefix={<UserOutlined />} />
      <p>Nhập mật khẩu</p>
      <Input placeholder="Nhập mật khẩu" prefix={<UserOutlined />} />
      <div class="term-of-use">
        <div class="checkbox">
          <input_ className="checkbox" type="checkbox" class="checkbox-custom"></input_>
          <Checkbox onChange={onChange}></Checkbox>
          <label for="term-of-use">
            Tôi đồng ý với Điều khoản sử dụng và Chính sách bảo mật của TicketX88
          </label>
        </div>
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
