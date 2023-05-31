import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/auth.context";
import mentors from "../../services/mentor.services";

import Skills from "../Skills/Skills";

import "../../pages/Mentor/Mentor.css";
import "./MentorCard.css";

const skillList = [];

const MentorCard = () => {
  const [mentorsList, setMentorsList] = useState([]);
  const [filteredList, setfilteredList] = useState([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    mentors
      .getAllMentors()
      .then((mentors) => {
        setMentorsList(mentors.data);
        setfilteredList(mentors.data);
      })
      .catch((err) => console.log(err));
  }, []);

  function filterMentors(e) {
    if (!skillList.includes(e.target.id)) skillList.push(e.target.id);
    else {
      skillList.splice(skillList.indexOf(e.target.id), 1);
    }

    const newList = mentorsList.filter((mentor) =>
      skillList.some((skill) => mentor.skills.includes(skill))
    );
    if (newList.length > 0) setfilteredList(newList);
    else setfilteredList(mentorsList);

    console.log(newList);
  }

  return (
    <div className="padding-bottom">
      <div className="mentorCardContainer">
        <Skills function={filterMentors} filtering={skillList}></Skills>
        {filteredList.map((each) => {
          return (
            <div key={each._id} className="mentorCard">
              <img
                className="mentorImage"
                src={each.profileImg}
                alt={each.username}
              ></img>

              <div className="profile-main">
                <h2 className="mentor-name">{each.username}</h2>
                <p className="mentor-body">{each.aboutMe}</p>
              </div>

              <div className="mentorBtns">
                <div className="mentorProfileBtn">
                  <Link to={`/profile/${each._id}`}>
                    <button>Profile</button>
                  </Link>
                </div>
              </div>

              <div className="mentorContactBtn">
                <Link to={`/chats/${user._id}/${each._id}`}>
                  <button>Contact</button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MentorCard;
