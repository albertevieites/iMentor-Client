import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { AuthContext } from "../../context/auth.context";

// Services
import { createQuestion, editQuestion } from "../../services/question.services";
import uploadService from "../../services/upload.services";

// Data
import tagsArr from "../../utils/tagsArr";

import "./QuestionForm.css";

function QuestionForm() {
  const location = useLocation();
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const startingFormState = {
    title: "",
    description: "",
    code: "",
    imageUrl: "",
    owner: { user },
    tags: [],
  };

  const [formState, setFormState] = useState(startingFormState);
  const [error, setError] = useState();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (location.state?.data) {
      setIsEditing(true);
      setFormState((prevState) => ({
        ...prevState,
        ...location.state.data,
        owner: { user },
      }));
    }
  }, [location.state, user]);

  // Handling adding or editing submit form
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form state before submit: ", formState);
    if (formState.title && formState.description) {
      if (location.state?.data) {
        // Edition mode
        editQuestion(formState, location.state.data._id)
          .then((data) => {
            console.log("API Response on Edit: ", data);
            navigate(`/questions/${data?.data._id}`);
          })
          .catch((error) => {
            console.log("API Error on Edit", error);
          });
      } else {
        createQuestion(formState)
          .then((data) => {
            console.log("API Response on Submit: ", data);
            navigate(`/questions/${data?.data._id}`);
          })
          .catch((error) => {
            console.log("API Error on Submit: ", error);
          });
      }
    } else {
      setError("Please fill out the empty fields");
    }
  };

  const handleInputChange = (event) => {
    console.log("Handling input change for:", event.currentTarget.name);
    const { name, value } = event.currentTarget;
    const newFormState = { ...formState, [name]: value };
    setFormState(newFormState);
  };

  function handleFileUpload(event) {
    const uploadData = new FormData();
    uploadData.append("imageData", event.target.files[0]);

    uploadService
      .uploadImage(uploadData)
      .then(({ data }) => {
        setFormState({ ...formState, imageUrl: data.cloudinary_url });
      })
      .catch((err) => console.log(err));
  }

  const handleTagChange = (event) => {
    const { options } = event.currentTarget;
    const newTags = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        newTags.push(options[i].value);
      }
    }
    setFormState((prevFormState) => ({
      ...prevFormState,
      tags: newTags,
    }));
  };

  return (
    <div className="add--form">
      {/* Page title */}
      <h1 className="ask">Ask Questions</h1>

      {/* FORM */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="title"></label>
        {/* Question title */}
        <input
          className="add--form__title"
          placeholder="Title"
          type="text"
          id="title"
          name="title"
          value={formState.title}
          onChange={handleInputChange}
        />

        {/* Description */}
        <label htmlFor="description"></label>
        <input
          className="add--form__description"
          placeholder="Description"
          type="text"
          id="description"
          name="description"
          value={formState.description}
          onChange={handleInputChange}
        />

        {/* Code */}
        <label htmlFor="code"></label>
        <textarea
          className="add--form__code"
          placeholder="Post your code here..."
          id="code"
          name="code"
          value={formState.code}
          onChange={handleInputChange}
        />

        {/* Updload screengrab */}
        <input
          type="file"
          className="add--form__upload"
          id="imageUrl"
          name="imageUrl"
          onChange={handleFileUpload}
          multiple
        />
        {formState.imageUrl && (
          <>
            <img
              src={formState.imageUrl}
              alt="profile"
              className="add--form__preview"
            />
          </>
        )}

        {/* Tags */}
        <label for="tags">Tags</label>
        <select
          name="tags"
          value={formState?.tags}
          onChange={handleTagChange}
          multiple
        >
          {tagsArr.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>

        {/* Post Question Button */}
        <button className="add--form__btn" type="submit" value="Post">
          {isEditing ? "Update Question" : "Publish Question"}
        </button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default QuestionForm;
