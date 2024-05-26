import React from "react";
import "../../styles/GoogleLogin.css";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

const CLIENT_ID =
  "957778684302-roirdu9se7h2e9f01kedlu82euq54pf2.apps.googleusercontent.com";

function Google_Login() {
  const navigate = useNavigate();

  const onSuccess = (response) => {
    console.log("Login Success:", response);
    console.log("ID Token:", response.credential);

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
