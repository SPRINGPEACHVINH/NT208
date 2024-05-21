import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Checkbox } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Input, Space } from "antd";
import { Link } from "react-router-dom";
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
      <Input.Password
        placeholder="Nhâp mật khẩu"
        iconRender={(visible) =>
          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
        }
      />
      <p></p>
      <span>Nhập lại mật khẩu</span>
      <Input.Password
        placeholder="Nhâp lại mật khẩu"
        iconRender={(visible) =>
          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
        }
      />
      <p></p>
      <span>Nhập số điện thoại</span>
      <Input placeholder="Nhập số điện thoại" prefix={<UserOutlined />} />
      <p></p>
      <div className="term-of-use">
        <div>
          <Checkbox className="checkbox" onClick={onClick}></Checkbox>
        </div>
        <p>
          Tôi đồng ý với Điều khoản sử dụng và Chính sách bảo mật của TicketX88{" "}
        </p>
        <a href="/SignIn">Đã có tài khoản?</a>
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
