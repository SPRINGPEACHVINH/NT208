import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { googleLogout } from "@react-oauth/google";

function GoogleLogout() {
    const navigate = useNavigate();
    const logout = () => {
        googleLogout();
        localStorage.setItem("isLoggedIn", false);
        localStorage.setItem("isGoogle", false);
        localStorage.removeItem("username");
        navigate("/");
    };

    return (
        <GoogleOAuthProvider clientId="957778684302-roirdu9se7h2e9f01kedlu82euq54pf2.apps.googleusercontent.com">
        <div className="google-login-container">
          <button onClick={logout}>Logout with Google</button>
        </div>
      </GoogleOAuthProvider>
    );
}

export default GoogleLogout;