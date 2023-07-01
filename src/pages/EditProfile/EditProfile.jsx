import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/auth.context";
import Profile from "../../services/profile.services";
import uploadService from "../../services/upload.services";

// import Skills from "../../components/Skills/Skills";

import "./EditProfile.css";

// EDIT PROFILE COMPONENT
const EditProfilePage = () => {
  const { user } = useContext(AuthContext);

  const [formState, setFormState] = useState();
  const [userType, setUserType] = useState();
  const [error, setError] = useState(null);
  const [image, setImage] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    Profile.getOneUser(user._id)
      .then((user) => {
        console.log("user", user.data);
        setFormState(user.data);
        setUserType(user.data.userType);
      })
      .catch((err) => console.log(err));
  }, [user._id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formState.username && formState.course) {
      Profile.editUser(user._id, formState);
      navigate(`/profile/${user._id}`);
    } else {
      setError("Please fill out the empty fields");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.currentTarget;
    const newFormState = { ...formState, [name]: value };
    setFormState(newFormState);
  };

  const handleFileUpload = (event) => {
    setImage(true);
    const uploadData = new FormData();
    uploadData.append("imageData", event.target.files[0]);
    uploadService
      .uploadImage(uploadData)
      .then(({ data }) => {
        setImage(false);
        setFormState({ ...formState, profileImg: data.cloudinary_url });
      })
      .catch((err) => console.log(err));
  };

  const handleType = () => {
    if (userType === "mentor") {
      setUserType("mentee");
      setFormState({ ...formState, userType: "mentee" });
      console.log(formState);
    } else {
      setUserType("mentor");
      setFormState({ ...formState, userType: "mentor" });
      console.log(formState);
    }
  };

  /*  const skillChange = (e) => {
    const skillId = e.target.id;
    const newForm = { ...formState };
    if (!newForm.skills.includes(skillId)) newForm.skills.push(skillId);
    else newForm.skills.splice(newForm.skills.indexOf(skillId), 1);
    setFormState(newForm);
  }; */

  return (
    <div className="edit--profile">
      <form onSubmit={handleSubmit}>
        {/* Image */}
        <img src={formState?.profileImg} alt={formState?.username} />

        {/* Avatar upload input  */}
        <input
          type="file"
          className="edit--profile__upload"
          placeholder="Upload Image"
          name="profileImg"
          onChange={handleFileUpload}
        />

        {/* Select course */}
        <select id="course" name="course" onChange={handleInputChange}>
          {!formState?.course && (
            <option value="" selected>
              Select a course
            </option>
          )}
          {formState?.course === "Web Development" ? (
            <option value="Web Development" selected>
              Web Development
            </option>
          ) : (
            <option value="Web Development">Web Development</option>
          )}
          {formState?.course === "UX/UI" ? (
            <option value="UX/UI" selected>
              UX/UI
            </option>
          ) : (
            <option value="UX/UI">UX/UI</option>
          )}
          {formState?.course === "Data Analytics" ? (
            <option value="Data Analytics" selected>
              Data Analytics
            </option>
          ) : (
            <option value="Data Analytics">Data Analytics</option>
          )}
        </select>

        {/* Mentor or mentee selection */}
        <div className="edit--profile__role">
          <p>Mentee</p>
          <label className="edit--profile__switch">
            {userType === "mentor" ? (
              <input type="checkbox" checked onClick={handleType} />
            ) : (
              <input type="checkbox" onClick={handleType} />
            )}
            <span className="slider round"></span>
          </label>
          <p>Mentor</p>
        </div>

        {/* Name */}
        <input
          type="text"
          id="name"
          name="username"
          placeholder="Name"
          className="edit--profile__name"
          value={formState?.username}
          onChange={handleInputChange}
        />

        {/* Email */}
        <input
          type="text"
          id="email"
          name="email"
          className="edit--profile__email"
          value={formState?.email}
          onChange={handleInputChange}
        />

        {/* If the user is mentor, render some more inputs */}
        {userType === "mentor" && (
          <>
            <input
              placeholder="Current position"
              className="edit--profile__ocuppation"
              type="text"
              id="name"
              name="ocuppation"
              value={formState?.ocuppation}
              onChange={handleInputChange}
            />

            <input
              placeholder="Company name"
              className="edit--profile__company"
              type="text"
              id="name"
              name="company"
              value={formState?.company}
              onChange={handleInputChange}
            />
            {/* <Skills function={skillChange}></Skills> */}
          </>
        )}

        {/* About me */}
        <textarea
          placeholder="About Me"
          className="about"
          type="text"
          id="name"
          name="aboutMe"
          value={formState?.aboutMe}
          onChange={handleInputChange}
        />

        {/* Save button */}
        <button className="edit--profile__btn" type="submit" value="Post">
          Save Changes
        </button>
      </form>

      {error && <p>{error}</p>}
    </div>
  );
};
export default EditProfilePage;
