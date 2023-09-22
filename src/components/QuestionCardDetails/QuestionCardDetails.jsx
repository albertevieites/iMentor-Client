import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { AuthContext } from "../../context/auth.context";
import User from "../../services/profile.services";
import questions from "../../services/question.services";

import "./QuestionCardDetails.css";

console.log(questions);

const QuestionDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [question, setQuestion] = useState(null);
  const [newComment, setNewComment] = useState({ comment: "" });
  const [databaseUser, setdatabaseUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    questions
      .getOneQuestion(id)
      .then((response) => {
        setQuestion(response.data);
      })
      .then(() => User.getOneUser(user._id))
      .then((user) => {
        console.log("use effect user", user.data);
        setdatabaseUser(user.data);
      })

      .catch((error) => console.log(error));
  }, [id, user]);

  const handleInput = (event) => {
    // const inputComments = event.target.comment;
    const value = event.target.value;

    setNewComment({ comment: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newComment.comment) {
      questions
        .createComment(newComment, id)
        .then((newquestion) => {
          setQuestion(newquestion.data);
          console.log(newquestion.data);
        })
        .then(() => setNewComment({ comment: "" }))
        .catch((error) => console.log(error));
    }
  };

  // Function to delete question from database
  const deleteQuestion = () => {
    questions.deleteQuestion(question._id);
    navigate("/questions");
  };

  // RENDERING COMPONENT
  return (
    <div className="question--details">
      {/* Question buttons */}
      <div className="question--details__edit">
        {databaseUser?._id === question?.owner._id && (
          <>
            <Link to={`/question/${question?._id}/edit`}>
              <button className="question--details__btns--edit">Edit</button>
            </Link>
            <button
              className="question--details__btns--delete"
              onClick={deleteQuestion}
            >
              Delete
            </button>
          </>
        )}
      </div>

      {/* Question container */}
      <div className="question--details__container">
        {/* Question content */}
        <div className="question--details__container--top">
          <h3>{question?.title}</h3>
          <pre>
            <code>{question?.description}</code>
          </pre>
          <img src={question?.imageUrl} alt="" />
        </div>

        {/* Add comments */}
        <div className="question--details__addcomment">
          <form action="submit" onSubmit={handleSubmit}>
            <input
              className="question--details__addcomment--textarea"
              type="text"
              name="comment"
              placeholder="Comment here..."
              onChange={handleInput}
            />
            <button type="submit">Post</button>
          </form>
        </div>

        {/* Added questions */}
        <div className="question--details__addedcomments">
          {question?.Comments.map((comment) => {
            return (
              <div
                key={comment._id}
                className="question--details__addedcomments--container"
              >
                <img src={comment.user.profileImg} alt="profile pic" />
                <h3>{comment.user.username}</h3>
                <p>{comment.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuestionDetails;
