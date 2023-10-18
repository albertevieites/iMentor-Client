import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Services
import { getAllQuestions } from "../../services/question.services";

import BubbleIcon from "../../assets/images/bubble.svg";

import "../../components/QuestionCard/QuestionCard.css";


const QuestionCard = ({ selectedTags }) => {
  const [questionList, setQuestionList] = useState([]);

  useEffect(() => {
    getAllQuestions()
      .then((questions) => {
        const reversedQuestions = questions.data.reverse();
        setQuestionList(reversedQuestions);
      })
      .catch((err) => console.log(err));
  }, [selectedTags]);

  const filteredQuestions =
    selectedTags.length === 0
      ? questionList
      : questionList.filter((question) =>
          selectedTags.some((tag) => question.tags.includes(tag))
        );

  return (
    <div className="question--card">
      {filteredQuestions.map(({ _id, owner, description, Comments }) => {
        return (
          <div key={_id} className="question--card__each">
            <div className="question--card__each--user">
              <img src={owner.profileImg} alt="" />
              <p>{owner.username}</p>
            </div>

            <div className="question--card__each--content">
              <p>{description}</p>
            </div>

            <div className="question--card__each--read">
              <div className="question--card__each--comments">
                <img src={BubbleIcon} alt="bubble icon" />
                {/* Comments counter */}
                <p>{Comments.length}</p>
              </div>
              <Link
                to={`/questions/${_id}`}
                className="question--card__each--btn"
              >
                <button>Read more</button>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default QuestionCard;
