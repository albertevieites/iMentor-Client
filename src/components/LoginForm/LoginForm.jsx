import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import authService from "../../services/auth.services";
import { AuthContext } from "./../../context/auth.context";

import Loader from "../Loader/Loader";

import "../../components/LoginForm/LoginForm.css";

const Loginform = () => {
  const [loginData, setLoginData] = useState({
    password: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const { storeToken, authenticateUser, user } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    authService
      .login(loginData)
      .then(({ data }) => {
        storeToken(data.authToken);
        authenticateUser();
        setLoading(true);
        setError(false);
      })
      .catch((err) => {
        setError(true);
        setLoginData({
          password: "",
          email: "",
        });
        console.log("this is the login error", err);
      });
  };

  useEffect(() => {
    if (user && user.course) navigate("/mentors");
    else if (user && !user.course) navigate(`/profile/${user._id}`);
  }, [user]);

  const handleInputChange = (e) => {
    const { value, name } = e.currentTarget;
    setLoginData({ ...loginData, [name]: value });
  };

  const { password, email } = loginData;

  return (
    <>
      <form onSubmit={handleSubmit} className="loginForm">
        <div className="labelInput login-email">
          <label htmlFor="input-email">Email</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="labelInput login-password">
          <label htmlFor="input-password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleInputChange}
            required
            minLength="8"
          />
        </div>

        <div className="login--form__btn">
          <button type="submit">Login</button>
        </div>
        
        {loading && <Loader />}
      </form>
      {error && <p>Incorrect login details</p>}
    </>
  );
};

export default Loginform;
