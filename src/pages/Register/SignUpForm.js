import React, { useState } from "react";
import "../../styles/SignUp.css";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import GoogleLoginButton from "./GoogleLogin";

function SignUpForm() {
  const [form, setForm] = useState({
    UserName: "",
    Email: "",
    Password: "",
    confirmPassword: "",
    PhoneNumber: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.Password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    // Call the API with form data
    console.log(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          name="UserName"
          placeholder="Nhập username"
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Email:
        <input
          type="email"
          name="Email"
          placeholder="Nhập email"
          onChange={handleChange}
          required
        />
      </label>

      <label className="password-container">
        Mật khẩu:
        <input
          type={showPassword ? "text" : "password"}
          name="Password"
          placeholder="Nhập mật khẩu"
          onChange={handleChange}
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="toggle-password"
        >
          {showPassword ? (
            <EyeInvisibleOutlined />
          ) : (
            <EyeTwoTone twoToneColor="orangered" />
          )}
        </button>
      </label>

      <label className="password-container">
        Xác nhận lại mật khẩu:
        <input
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          placeholder="Nhập lại mật khẩu"
          onChange={handleChange}
          required
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="toggle-password"
        >
          {showConfirmPassword ? (
            <EyeInvisibleOutlined />
          ) : (
            <EyeTwoTone twoToneColor="orangered" />
          )}
        </button>
      </label>

      <label>
        Số điện thoại:
        <input
          type="tel"
          name="PhoneNumber"
          placeholder="Nhập số điện thoại"
          onChange={handleChange}
          required
        />
      </label>

      <div className="agreement">
        <input type="checkbox" required />
        <span style={{ fontSize: "0.8em", marginTop: "3px", fontSize: "13px"}}>
          Tôi đồng ý với <a href="#">Điều khoản sử dụng</a> và{" "}
          <a href="#">Chính sách bảo mật</a> của TicketX88
        </span>
      </div>

      <input type="submit" value="Tiếp tục" />
      
      <GoogleLoginButton />

      <div className="login-link">
        Đã có tài khoản? <a href="/SignIn">Đăng nhập</a>
      </div>
    </form>
  );
}

export default SignUpForm;
