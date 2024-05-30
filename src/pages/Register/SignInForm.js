import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/actions";
import "../../styles/SignIn.css";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import GoogleLoginButton from "./GoogleLogin";

function SignInForm() {
  const [form, setForm] = useState({
    UserName: "",
    Password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8881/api/user/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Response was not ok");
      }

      //const data = await response.json();

      dispatch(logIn(form.UserName));
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("isGoogle", "false")
      localStorage.setItem("username", form.UserName);
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
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
        Mật khẩu:
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

      <input className="signin-submit" type="submit" value="Đăng nhập" />

      <div className="signup-link">
        Chưa có tài khoản?{" "}
        <a style={{ fontSize: 16 }} href="/SignUp">
          Đăng ký
        </a>
      </div>
    </form>
  );
}

export default SignInForm;
