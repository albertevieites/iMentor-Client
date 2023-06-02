import { Link } from "react-router-dom";

import Logo from '../../assets/logo/imentor.svg';

import "./Home.css";

const IndexPage = () => {
  return (
    <div className="homeContainer">
      <img
        src={Logo}
        alt="Logo"
      />

      <div className="homeBtns">
        <div className="signupBtn-Home">
          <Link to="/signup">
            <button>Sign Up</button>
          </Link>
        </div>

        <div className="loginBtn-Home">
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
