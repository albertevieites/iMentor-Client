/* import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { AuthContext } from "../../context/auth.context";
import questions from "../../services/question.services";
import uploadService from "../../services/upload.services"; */

import AddForm from "../../components/AddForm/AddForm";

import "../../pages/Profile/Profile.css";
import "./AddQuestion.css";

const AddQuestion = () => {
  /*   const { id } = useParams();
  const { user } = useContext(AuthContext);
  console.log(user); */
  /*   const [formState, setFormState] = useState();
  const [imageUrl, setImageUrl] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate(); */
  /*   useEffect(() => {
    questions
      .getOneQuestion(id)
      .then((question) => {
        console.log("question", question.data);
        setFormState(question.data);
      })
      .catch((err) => console.log(err));
  }, [id]); */
  /*   const handleSubmit = (event) => {
    event.preventDefault();
    if (formState.title && formState.description) {
      questions.editQuestion(formState, id);
      navigate(`/questions/${id}`);
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
    setImageUrl(true);
    const uploadData = new FormData();
    uploadData.append("imageData", event.target.files[0]);
    uploadService
      .uploadImage(uploadData)
      .then(({ data }) => {
        setImageUrl(false);
        setFormState({ ...formState, imageUrl: data.cloudinary_url });
      })
      .catch((err) => console.log(err));
  }
  function skillChange(e) {
    const skillId = e.target.id;
    const newForm = { ...formState };
    if (!newForm.skills.includes(skillId)) newForm.skills.push(skillId);
    else newForm.skills.splice(newForm.skills.indexOf(skillId), 1);
    setFormState(newForm);
  } */
  return (
    <div className="add--question">
      <AddForm />
    </div>
  );
};
export default AddQuestion;
