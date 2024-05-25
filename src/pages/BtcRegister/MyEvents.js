import React from "react";
import "../../styles/Form.css";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const CLIENT_ID = "YOUR_CLIENT_ID.apps.googleusercontent.com";

function MyEvents() {
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

export default MyEvents;
