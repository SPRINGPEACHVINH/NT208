import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input } from "antd";
import "../../styles/Register.css";

function onClick(e) {
  console.log(`checked = ${e.target.checked}`);
}
function Login() {
  const googleAuth = () => {
    window.open(
      `$http://localhost:8881/auth/google/callback`,
      "_self"
    )
  }
}
function Signin() {
  return (
    <div className="sign-up">
      <span>Nhập email</span>
      <Input placeholder="Nhập email" prefix={<UserOutlined />} />
      <p></p>
      <span>Nhập mật khẩu</span>
      <Input.Password
        placeholder="Nhâp mật khẩu"
        iconRender={(visible) =>
          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
        }
      />
      <p></p>
      <div className="term-of-use">
        <a href="/register">Chưa có tài khoản?</a>
      </div>
      
      <div class="Continue-part">
        <button class="Continue-button" type="submit" onClick={Login}>
          Tiếp tục
        </button>
      </div>
    </div>
  );
}

export default Signin;
