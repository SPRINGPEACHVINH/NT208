import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import "../../styles/GoogleLogin.css";

const CLIENT_ID =
  "957778684302-roirdu9se7h2e9f01kedlu82euq54pf2.apps.googleusercontent.com";

function GoogleLoginButton() {
  const onSuccess = (response) => {
    console.log("Login Success:", response);
    console.log("ID Token:", response.credential);
  };

  const onFailure = (response) => {
    console.log("Login Failed:", response);
  };

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <div className="google-login-container">
        <GoogleLogin
          onSuccess={onSuccess}
          onError={onFailure}
          className="google-login-button"
        />
      </div>
    </GoogleOAuthProvider>
  );
}

export default GoogleLoginButton;
