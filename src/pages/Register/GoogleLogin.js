import React from "react";
import "../../styles/Form.css";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const CLIENT_ID =
  "957778684302-roirdu9se7h2e9f01kedlu82euq54pf2.apps.googleusercontent.com";

function Google_Login() {
  const onSuccess = (response) => {
    console.log("Login Success:", response);

    console.log("ID Token:", response.credential);
  };

  const onFailure = (response) => {
    console.log("Login Failed:", response);
  };

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <div>
        <GoogleLogin onSuccess={onSuccess} onError={onFailure} />
      </div>
    </GoogleOAuthProvider>
  );
}

export default Google_Login;
