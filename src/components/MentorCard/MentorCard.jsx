import { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/auth.context";

import "./MentorCard.css";

const MentorCard = (props) => {
  const { user } = useContext(AuthContext);
  console.log(props)

  return (
      <div key={props.key} className="mentor--card">
        <img src={props.profileImg} alt={props.username}></img>

        <div className="mentor--card__content">
          <h2>{props.username}</h2>
          <p>{props.about}</p>
        </div>

        <div className="mentor--card__btns">
          <div className="mentor--card__btns--profile">
            <Link to={`/profile/${props.key}`}>
              <button>Profile</button>
            </Link>
          </div>
          <div className="mentor--card__btns--contact">
            <Link to={`/chats/${user._id}/${props.key}`}>
              <button>Contact</button>
            </Link>
          </div>
        </div>
      </div>
  );
};

export default MentorCard;
