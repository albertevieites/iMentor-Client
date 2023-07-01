import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "../../components/QuestionCard/QuestionCard.css";

import questions from "../../services/question.services";
/* import Skills from "../Skills/Skills";

const skillList = []; */

const QuestionCard = () => {
  const [questionList, setQuestionList] = useState([]);
  const [filteredList, setfilteredList] = useState([]);

  useEffect(() => {
    questions
      .getAllQuestions()
      .then((questions) => {
        const reversedQuestions = questions.data.reverse();
        setQuestionList(reversedQuestions);
        setfilteredList(reversedQuestions);
      })
      .catch((err) => console.log(err));
  }, []);

/*   function filterQuestions(e) {
    if (!skillList.includes(e.target.id)) skillList.push(e.target.id);
    else {
      skillList.splice(skillList.indexOf(e.target.id), 1);
    }

    const newList = questionList.filter((mentor) =>
      skillList.some((skill) => mentor.skills.includes(skill))
    );
    if (newList.length > 0) setfilteredList(newList);
    else setfilteredList(questionList);

    console.log(newList);
  } */

  return (
    <div className="question--card">
      {/* <Skills function={filterQuestions} filtering={skillList}></Skills> */}
      {filteredList.map(({ _id, owner, title, description }) => {
        const shortDescription = description.slice(0, 100) + "...";
        return (
          <div key={_id} className="question--card__each">
            <div className="question--card__each--user">
              <img src={owner.profileImg} alt=""/>
              <p>{owner.username}</p>
            </div>

            <div className="question--card__each--content">
              <h2>{title}</h2>
              <p>{shortDescription}</p>
            </div>

            <Link to={`/questions/${_id}`} className="question--card__each--btn">
              <button>Read more</button>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default QuestionCard;
