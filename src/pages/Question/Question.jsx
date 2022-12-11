import { Link } from "react-router-dom";

import Questions from "../../components/QuestionCard/QuestionCard";

import "./Question.css";

const QuestionPage = () => {
  return (
    <div className="questionContainer">
      <h2 className="feed">Feed</h2>
      <Link to={`/addquestion`}>
        <button className="addPostBtn">Add a post</button>
      </Link>

      <Questions></Questions>
    </div>
  );
};

export default QuestionPage;