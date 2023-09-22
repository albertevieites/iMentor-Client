import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";

import "./Footer.css";

import FeedIcn from "../../assets/icons/search.svg";
import MentorsIcn from "../../assets/icons/school.svg";
import ProfileIcn from "../../assets/icons/person.svg";

const Footer = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if (user)
    return (
      <footer className="footer">
        <Link to="/feed" className={`nav-link ${location.pathname === "/feed" ? "active-link" : ""}`} >
          <img
            src={FeedIcn}
            alt="feed icon"
          />
          <p>Feed</p>
        </Link>
        <Link to="/mentors" className={`nav-link ${location.pathname === "/mentors" ? "active-link" : ""}`}>
          <img
            src={MentorsIcn}
            alt="mentors icon"
          />
          <p>Mentors</p>
        </Link>
        <Link to={`/profile/${user._id}`} className={`nav-link ${location.pathname.startsWith("/profile/") ? "active-link" : ""}`}>
          <img
            src={ProfileIcn}
            alt="profile icon"
          />
          <p>Profile</p>
        </Link>
      </footer>
    );
};

export default Footer;
