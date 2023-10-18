import { useContext, useEffect, useState, Fragment } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { AuthContext } from "../../context/auth.context";

// Services
import User from "../../services/profile.services";

import {
  getOneQuestion,
  createComment,
  deleteQuestion,
} from "../../services/question.services";

import "./QuestionDetails.css";

const QuestionDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [question, setQuestion] = useState(null);
  const [newComment, setNewComment] = useState({ comment: "" });
  const [databaseUser, setdatabaseUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    // Fetching question
    getOneQuestion(id)
      .then((response) => {
        if (isMounted) {
          if (response.data) {
            // Check for truthy data before updating state
            setQuestion(response.data);
          } else {
            console.log("Invalid question data: ", response.data);
          }
        }
        return User.getOneUser(user._id); // Fetching user
      })
      .then((userResponse) => {
        if (isMounted) {
          if (userResponse.data) {
            // Checking for truthy data before updating state
            setdatabaseUser(userResponse.data);
          } else {
            console.log("Invalid user data: ", userResponse.data);
          }
        }
      })
      .catch((error) => {
        if (isMounted) {
          console.log(error);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id, user]);

  const handleInput = (event) => {
    const value = event.target.value;
    setNewComment({ comment: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (newComment.comment) {
      createComment(newComment, id)
        .then((newquestion) => {
          setQuestion(newquestion.data);
          setNewComment({ comment: "" });
        })
        .catch((error) => console.log(error));
    }
  };

  // Function to delete question from database
  const deleteThisQuestion = () => {
    deleteQuestion(question._id)
      .then(()=>{
        navigate("/feed")
      })
      .catch((error) => console.log(error));
  };

  // RENDERING COMPONENT
  return (
    <div className="question--details">
      {/* Question container */}
      <div className="question--details__container">
        {/* Question content */}
        <div className="question--details__container--top">
          <h3>{question?.title}</h3>
          <p>{question?.description}</p>
          <pre>
            <code>{question?.code}</code>
          </pre>
          <img src={question?.imageUrl} alt="" />
        </div>

        {/* Question edit/delete buttons */}
        <div className="question--details__btns">
          {databaseUser?._id === question?.owner._id && (
            <Fragment>
              <Link
                to={`/question/${question?._id}/edit`}
                state={{ data: question }}
                className="question--details__btns--edit"
              >
                Edit
              </Link>
              <button
                className="question--details__btns--delete"
                onClick={deleteThisQuestion}
              >
                Delete
              </button>
            </Fragment>
          )}
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
              value={newComment.comment}
            />
            <button type="submit">Comment</button>
          </form>
        </div>

        {/* Added comments */}
        <div className="question--details__addedcomments">
          {question?.Comments.map((comment) => {
            return (
              <div
                key={comment._id}
                className="question--details__addedcomments--container"
              >
                <div className="question--details__addedcomments--user">
                  <img src={comment.user.profileImg} alt="profile pic" />
                  <h3>{comment.user.username}</h3>
                </div>
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
