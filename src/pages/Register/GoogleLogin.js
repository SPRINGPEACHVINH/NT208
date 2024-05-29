import React from "react";
import "../../styles/GoogleLogin.css";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const { jwtDecode } = require("jwt-decode");

const CLIENT_ID =
  "957778684302-roirdu9se7h2e9f01kedlu82euq54pf2.apps.googleusercontent.com";

function Google_Login() {
  const navigate = useNavigate();

  const onSuccess = async (response) => {
    var obj = jwtDecode(response.credential);
    var data = JSON.stringify(obj);
    data = JSON.parse(data);

    const config = {
      method: "POST",
      url: "http://localhost:8881/api/user/sign-in-google",
      headers: {},
      body: JSON.stringify({
        UserName: data.name,
        Email: data.email,
      }),
    };
    await axios(config);

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("isGoogle", "true")
    localStorage.setItem("username", data.name);
    navigate("/");
  };

  const onFailure = (response) => {
    console.log("Login Failed:", response);
  };

  return (
    <div className="google-login-container">
      <GoogleOAuthProvider clientId={CLIENT_ID}>
        <GoogleLogin onSuccess={onSuccess} onError={onFailure} />
      </GoogleOAuthProvider>
    </div>
  );
}

export default Google_Login;
