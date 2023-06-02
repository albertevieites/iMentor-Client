import { Link } from "react-router-dom";

import Loginform from "../../components/LoginForm/LoginForm";

import Logo from "../../assets/logo/imentor.svg"

import "./Login.css";

const LoginPage = () => {
  return (
    <div className="loginContainer">
      <div className="logo-login">
        <Link to="/">
          <img
            src={Logo}
            alt="Logo"
          />
        </Link>
      </div>

      <Loginform />
    </div>
  );
};

export default LoginPage;
