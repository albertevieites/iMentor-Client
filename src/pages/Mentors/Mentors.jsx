import { useState, useEffect } from "react";

import mentors from "../../services/mentor.services";

import MentorCard from "../../components/MentorCard/MentorCard";

import "./Mentors.css";

const Mentors = () => {
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    mentors
      .getAllMentors()
      .then((mentors) => {
        // setMentorsList(mentors.data);
        setFilteredList(mentors.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="mentors">
      <div className="mentors__grid">
        {filteredList.map((each, index) => {
          return (
            <MentorCard
              key={index}
              userId={each._id}
              profileImg={each.profileImg}
              username={each.username}
              about={each.aboutMe}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Mentors;
