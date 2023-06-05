import { useEffect, useState } from "react";

import skills from "../../services/skills.services";

import "./Skills.css";

const Skills = (props) => {
  const [skillsList, setSkillsList] = useState([]);

  useEffect(() => {
    skills
      .get5Skills()
      .then((skills) => {
        setSkillsList(skills.data);
      })
      .catch((err) => console.log(err));
  }, []);

  function showAll() {
    skills
      .getAllSkills()
      .then((skills) => {
        // console.log("skills from card", skills)
        setSkillsList(skills.data);
      })
      .catch((err) => console.log(err));
  }

  function showLess() {
    skills
      .get5Skills()
      .then((skills) => {
        // console.log("skills from card", skills)
        setSkillsList(skills.data);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="skills">
      {skillsList.map((skill) => {
        return props.filtering?.includes(skill._id) ? (
          <span
            className="skills__chips--selected"
            key={skill._id}
            id={skill._id}
            onClick={(e) => props.function(e)}
          >
            {skill.name}
          </span>
        ) : (
          <span
            className="skills__chips--noselected"
            key={skill._id}
            id={skill._id}
            onClick={(e) => props.function(e)}
          >
            {skill.name}
          </span>
        );
      })}
      {skillsList.length === 5 ? (
        <div onClick={showAll} className="showMore">
          <p>Expand skills</p>
        </div>
      ) : (
        <div onClick={showLess} className="showLess">
          <p>Collapse skills</p>
        </div>
      )}
    </div>
  );
};

export default Skills;
