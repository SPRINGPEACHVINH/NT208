import React, { useState } from "react";
import "../../styles/SignIn.css";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

function SignInForm() {
  const [form, setForm] = useState({
    UserName: "",
    Password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the API with form data
    console.log(form);
  };

  return (
    <form className="signin-form" onSubmit={handleSubmit}>
      <label className="signin-label">
        Username:
        <input
          type="text"
          name="UserName"
          placeholder="Nhập username"
          onChange={handleChange}
          className="input-username"
          required
        />
      </label>

      <label className="password-container">
        Password:
        <input
          type={showPassword ? "text" : "password"}
          name="Password"
          placeholder="Nhập mật khẩu"
          onChange={handleChange}
          className="input-password"
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

      <input type="submit" value="Đăng nhập" />

      <div className="signup-link">
        Chưa có tài khoản? <a href="/SignUp">Đăng ký</a>
      </div>
    </form>
  );
}

export default SignInForm;
