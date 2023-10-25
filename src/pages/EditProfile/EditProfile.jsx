import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../context/auth.context";
import Profile from "../../services/profile.services";
import uploadService from "../../services/upload.services";

import "./EditProfile.css";

// EDIT PROFILE COMPONENT
const EditProfile = () => {
  const { user } = useContext(AuthContext);

  const [formState, setFormState] = useState();
  const [userType, setUserType] = useState();
  const [error, setError] = useState(null);
  const [, setImage] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    Profile.getOneUser(user._id)
      .then((user) => {
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
    const { name, options } = event.currentTarget;

    if (name === "skills") {
      const selectedSkills = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);
      setFormState((prevState) => ({ ...prevState, [name]: selectedSkills }));
    } else {
      const { value } = event.currentTarget;
      setFormState((prevState) => ({ ...prevState, [name]: value }));
    }
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

  // Handle Mentee or Mentor Selection
  const handleType = () => {
    const newType = userType === "mentor" ? "mentee" : "mentor";
    setUserType(newType);
    setFormState((prevState) => ({ ...prevState, userType: newType }));
  };

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
        <select
          id="course"
          name="course"
          value={formState?.course}
          onChange={handleInputChange}
        >
          <option value="">Select a course</option>
          <option value="Web Development">Web Development</option>
          <option value="UX/UI">UX/UI</option>
          <option value="Data Analytics">Data Analytics</option>
        </select>

        {/* Mentor or mentee selection */}
        <div className="edit--profile__role">
          <p>Mentee</p>
          <label className="edit--profile__switch">
            <input
              type="checkbox"
              checked={userType === "mentor"}
              onChange={handleType}
            />
            <span className="slider round"></span>
          </label>
          <p>Mentor</p>
        </div>

        {/* Name */}
        <input
          type="text"
          id="username"
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
              className="edit--profile__occupation"
              type="text"
              id="occupation"
              name="occupation"
              value={formState?.occupation}
              onChange={handleInputChange}
            />

            <input
              placeholder="Company name"
              className="edit--profile__company"
              type="text"
              id="company"
              name="company"
              value={formState?.company}
              onChange={handleInputChange}
            />
          </>
        )}

        {/* About me */}
        <textarea
          placeholder="About Me"
          className="about"
          type="text"
          id="aboutMe"
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
export default EditProfile;
