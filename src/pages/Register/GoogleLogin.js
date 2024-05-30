import React, { useState } from "react";
import "../../styles/GoogleLogin.css";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleOAuthProvider } from "@react-oauth/google";

// const CLIENT_ID =
//   "957778684302-roirdu9se7h2e9f01kedlu82euq54pf2.apps.googleusercontent.com";

function Google_Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  // const [profile, setProfile] = useState([]);

  var profile;

  if (user) {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        console.log("res: ", res);
        console.log(res.data);
        profile = res.data;
        console.log("profile: ", profile);
      })
      .catch((err) => console.log(err));
  }

  // const handlelogin = async (response) => {
  //   // setUser(response);
  //   var obj = jwtDecode(response.credential);
  //   var data = JSON.stringify(obj);
  //   data = JSON.parse(data);

  //   const config = {
  //     method: "POST",
  //     url: "http://localhost:8881/api/user/sign-in-google",
  //     headers: {},
  //     body: JSON.stringify({
  //       UserName: data.name,
  //       Email: data.email,
  //     }),
  //   };
  //   await axios(config);

  //   localStorage.setItem("isLoggedIn", "true");
  //   localStorage.setItem("isGoogle", "true");
  //   localStorage.setItem("username", data.name);
  //   navigate("/");
  // }

  const onSuccess = async (response) => {
    try {
      const config = {
        method: "POST",
        url: "http://localhost:8881/api/user/sign-in-google",
        headers: {},
        body: JSON.stringify({
          UserName: profile.name,
          Email: profile.email,
        }),
      };
      await axios(config);

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("isGoogle", "true");
      localStorage.setItem("username", profile.name);
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const login = useGoogleLogin({
    onSuccess: (coderesponse) => onSuccess(coderesponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  return (
    <GoogleOAuthProvider clientId="957778684302-roirdu9se7h2e9f01kedlu82euq54pf2.apps.googleusercontent.com">
      <div className="google-login-container">
        <button onClick={login}>Login with Google</button>
      </div>
    </GoogleOAuthProvider>
  );
}

export default Google_Login;
