import { useState, useEffect } from "react";

import mentors from "../../services/mentor.services";

import MentorCard from "../../components/MentorCard/MentorCard";

import "./Mentors.css";

import Skills from "../../components/Skills/Skills";

const skillList = [];

const Mentors = () => {
  const [filteredList, setFilteredList] = useState([]);
  const [mentorsList, setMentorsList] = useState([]);

  useEffect(() => {
    mentors
      .getAllMentors()
      .then((mentors) => {
        setMentorsList(mentors.data);
        setFilteredList(mentors.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const filterMentors = (e) => {
    if (!skillList.includes(e.target.id)) skillList.push(e.target.id);
    else {
      skillList.splice(skillList.indexOf(e.target.id), 1);
    }

    const newList = mentorsList.filter((mentor) =>
      skillList.some((skill) => mentor.skills.includes(skill))
    );
    if (newList.length > 0) setFilteredList(newList);
    else setFilteredList(mentorsList);
  };

  return (
    <div className="mentors">
      <Skills function={filterMentors} filtering={skillList}></Skills>
      <div className="mentors__grid">
        {filteredList.map((each) => (
          <MentorCard
            userId={each._id}
            profileImg={each.profileImg}
            username={each.username}
            about={each.aboutMe}
          />
        ))}
      </div>
    </div>
  );
};

export default Mentors;
