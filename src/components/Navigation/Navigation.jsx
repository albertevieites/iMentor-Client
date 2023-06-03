import { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/auth.context";

import "./Navigation.css";

const Navigation = () => {
  const { user } = useContext(AuthContext);

  if (user)
    return (
      <nav>
        <Link to="/mentors">
          <p>iMentor</p>
        </Link>
      </nav>
    );
};

export default Navigation;
