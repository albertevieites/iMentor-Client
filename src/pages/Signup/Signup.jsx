import { Link } from "react-router-dom";

import SignupForm from "../../components/SignupForm/SignupForm";

import Logo from "../../assets/logo/imentor.svg"

import "./Signup.css";

const Signup = () => {
  return (
    <div className="signupContainer">
      <div className="logo-signup">
        <Link to="/">
          <img
            src={Logo}
            alt="Logo"
          />
        </Link>
      </div>
      <SignupForm />
    </div>
  );
};

export default Signup;
