import { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/auth.context";

import "./Navbar.css";

const Navbar = () => {
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

export default Navbar;
