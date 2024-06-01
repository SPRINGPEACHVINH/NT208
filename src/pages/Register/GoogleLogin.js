import React, { useEffect, useState } from "react";
import "../../styles/GoogleLogin.css";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Google_Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);

  useEffect(() => {
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
      onSuccess(res.data)
    })
    .catch((err) => console.log(err));

  })

  const onSuccess = async (response) => {
    try {
      const config = await fetch("http://localhost:8881/api/user/google-sign-in", {
        mode: "no-cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          UserName: response.name,
          Email: response.email,
          Password: response.id,
        }
      });

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("isGoogle", "true");
      localStorage.setItem("username", response.name);
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const login = useGoogleLogin({
    onSuccess: (coderesponse) => setUser(coderesponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  return (
      <div className="google-login-container">
        <button onClick={login}>Login with Google</button>
      </div>

  );
}

export default Google_Login;