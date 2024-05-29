import React, { useState } from "react";
import "../../styles/GoogleLogin.css";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { json, useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useEffect } from "react";
const { jwtDecode } = require("jwt-decode");

// const CLIENT_ID =
//   "957778684302-roirdu9se7h2e9f01kedlu82euq54pf2.apps.googleusercontent.com";

function Google_Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);

  var obj

  useEffect(() => {
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
          console.log("res: ", res)
          console.log(res.data)
          obj = jwtDecode(res.data)
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    setProfile(null);
  };

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
    var obj = jwtDecode(obj)
    obj = JSON.stringify(obj)
    console.log(obj)

    setUser(response);
    console.log("user: ", user);
    console.log("response: ", response);
    console.log("profile.name: ", obj.name);

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
  };

  // const onFailure = (response) => {
  //   console.log("Login Failed:", response);
  // };

  // const login = useGoogleLogin({
  //   onSuccess,
  //   onFailure,
  // });
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
