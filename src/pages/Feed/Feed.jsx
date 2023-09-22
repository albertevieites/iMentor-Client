import { Link } from "react-router-dom";

import QuestionCard from "../../components/QuestionCard/QuestionCard";

import "./Feed.css";

const Feed = () => {
  return (
    <div className="feed">
      <QuestionCard />

      <Link to={`/addquestion`} className="feed__btn">
        Add a post
      </Link>
    </div>
  );
};

export default Feed;
