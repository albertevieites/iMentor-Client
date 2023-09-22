import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import Skills from "../Skills/Skills";

import { AuthContext } from "../../context/auth.context";

import questionService from "../../services/question.services";
import uploadService from "../../services/upload.services";

import "./AddForm.css";

function AddForm() {
  const [imageUrl, setImageUrl] = useState(false);
  const { user } = useContext(AuthContext);
  const startingFormState = {
    title: "",
    description: "",
    code: "",
    imageUrl: "",
    owner: { user },
    skills: [],
  };

  const [formState, setFormState] = useState(startingFormState);
  const [error, setError] = useState();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formState.title && formState.description) {
      questionService
        .createQuestion(formState)
        .then((data) => {
          console.log(data.data);
          navigate(`/questions/${data?.data._id}`);
        })

        .catch((error) => {
          console.log(error);
        });
    } else {
      setError("Please fill out the empty fields");
    }
  };

  const handleInputChange = (event) => {
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
        setImageUrl(data.cloudinary_url);
        setFormState({ ...formState, imageUrl: data.cloudinary_url });
      })
      .catch((err) => console.log(err));
    /*
        uploadData.append("upload_preset","fzk9q9ld")
        uploadService.uploadImage(uploadData)
        .then(fileUrl => setImage(fileUrl))*/
  }

  function skillChange(e) {
    const skillId = e.target.id;
    const newForm = { ...formState };

    if (!newForm.skills.includes(skillId)) newForm.skills.push(skillId);
    else newForm.skills.splice(newForm.skills.indexOf(skillId), 1);
    setFormState(newForm);
    console.log(newForm.skills);
  }

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
          placeholder="Question Title"
          type="text"
          id="name"
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
          name="description"
          value={formState.description}
          onChange={handleInputChange}
        />

        {/* Code */}
        <label htmlFor="code"></label>
        <textarea
          className="add--form__code"
          placeholder="Post your code here..."
          type="text"
          id="text"
          name="code"
          value={formState.code}
          onChange={handleInputChange}
        />

        {/* Updload screengrab */}
        <input
          type="file"
          className="add--form__upload"
          name="imageUrl"
          onChange={(e) => handleFileUpload(e, setImageUrl)}
          multiple
        />
        {imageUrl && (
          <>
            <img src={imageUrl} alt="profile" className="add--form__preview" />
          </>
        )}

        <Skills function={skillChange} filtering={formState.skills}></Skills>

        <button className="add--form__btn" type="submit" value="Post">
          Post Question
        </button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default AddForm;
