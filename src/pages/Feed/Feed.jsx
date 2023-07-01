import { Link } from "react-router-dom";

import QuestionCard from "../../components/QuestionCard/QuestionCard";

import "./Feed.css";

const Feed = () => {
  return (
    <div className="feed">
      <h2 className="feed__title">Feed</h2>
      <Link to={`/addquestion`}>
        <button className="feed__btn">Add a post</button>
      </Link>

      <QuestionCard />
    </div>
  );
};

export default Feed;
