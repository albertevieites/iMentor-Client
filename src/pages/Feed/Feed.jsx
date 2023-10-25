import { useState } from "react";
import { Link } from "react-router-dom";

import QuestionCard from "../../components/QuestionCard/QuestionCard";
import Tags from "../../components/Tags/Tags";

import "./Feed.css";

const Feed = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [questionDeleted, setQuestionDeleted] = useState(false);

  const handleTagSelection = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags((prevTags) => prevTags.filter((t) => t !== tag));
    } else {
      setSelectedTags((prevTags) => [...prevTags, tag]);
    }
  };

  return (
    <div className="feed">
      <Tags onTagSelect={handleTagSelection} selectedTags={selectedTags} />
      <QuestionCard selectedTags={selectedTags} reloadQuestions={questionDeleted} />
      <div className="feed__link--container">
        <Link to={`/addquestion`} className="feed__btn">
          Add Question
        </Link>
      </div>
    </div>
  );
};

export default Feed;
