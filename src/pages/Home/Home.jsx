import { Link } from "react-router-dom";

import Logo from '../../assets/logo/imentor.svg';

import "./Home.css";

const IndexPage = () => {
  return (
    <div className="home">
      <img
        src={Logo}
        alt="Logo"
      />

      <div className="home--btns">
        <div className="home--signup__btn">
          <Link to="/signup">
            <button>Sign Up</button>
          </Link>
        </div>

        <div className="home--login__btn">
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
