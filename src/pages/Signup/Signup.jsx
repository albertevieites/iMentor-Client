import { Link } from "react-router-dom";

import SignupForm from "../../components/SignupForm/SignupForm";

import "./Signup.css";

const Signup = () => {
  return (
    <div className="signupContainer">
      <div className="logo-signup">
        <Link to="/">
          <img
            src="https://res.cloudinary.com/dz2hyfmhw/image/upload/v1654165990/iMentor/logo_wxclwz.png"
            alt="Logo"
          />
        </Link>
      </div>
      <SignupForm />
    </div>
  );
};

export default Signup;
