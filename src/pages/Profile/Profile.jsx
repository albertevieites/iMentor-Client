import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { AuthContext } from "../../context/auth.context";
import profile from "../../services/profile.services";

import "./Profile.css";

const ProfilePage = () => {
  const { user, logOutUser } = useContext(AuthContext);
  const [userProfile, setuserProfile] = useState([]);
  const profileId = useParams();

  useEffect(() => {
    profile
      .getOneUser(profileId.id)
      .then((user) => {
        setuserProfile(user.data);
      })
      .catch((err) => console.log(err));
  }, [profileId.id]);

  // Mentor Profile Details
  if (userProfile.userType === "mentor") {
    return (
      <div className="mentor--profile">
        <div className="mentor--profile__container">
          {/* Course */}
          <h2 className="mentor--profile__container--course">
            {userProfile.course}
          </h2>

          {/* Avatar */}
          <img src={userProfile.profileImg} alt={userProfile.username} />

          {/* Mentor or mentee */}
          <span>{userProfile.userType}</span>

          {/* Name */}
          <h2 className="mentor--profile__container--name">
            {userProfile.username}
          </h2>

          {/* email */}
          <p className="mentor--profile__container--email">
            {userProfile.email}
          </p>

          {/* Ocuppation */}
          <p className="mentor--profile__container--occupation">
            {userProfile.ocuppation}
          </p>

          {/* Company */}
          <p className="mentor--profile__container--company">
            {userProfile.company}
          </p>

          {/* Skills */}
          {userProfile.skills.map((skill) => {
            return <span key={skill._id}>{skill.name}</span>;
          })}

          {/* About me */}
          <p className="mentor--profile__container--about">
            {userProfile.aboutMe}
          </p>

          {/* Buttons */}
          {user._id === userProfile._id && (
            <div className="mentor--profile__btns">
              <Link to={"/profile/edit"}>
                <button className="mentor--profile__btns--edit">Edit</button>
              </Link>
              <Link to={"/"}>
                <button
                  className="mentor--profile__btns--logout"
                  onClick={logOutUser}
                >
                  Log out
                </button>
              </Link>
            </div>
          )}

          {/* Posted questions */}
          {userProfile.questions?.map((question) => {
            return (
              <div key={question._id} className="mentor--profile__question">
                <Link
                  to={`/questions/${question._id}`}
                  className="mentor--profile__link"
                >
                  <img
                    className="mentor--profile__question--avatar"
                    src={question.owner.profileImg}
                    alt=""
                  />
                  <h2>{question.title}</h2>
                </Link>
                <pre>
                  <code>{question.description}</code>
                </pre>
                {question.imageUrl && (
                  <img
                    width="150"
                    height="150"
                    src={question.imageUrl}
                    alt="mentor--profile__question--screengrab"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    // Mentee Profile Details
    return (
      <div className="mentee--profile">
        <div className="mentee--profile__container">
          {/* Course */}
          <h2 className="mentee--profile__course">{userProfile.course}</h2>

          {/* Mentee avatar */}
          <img src={userProfile.profileImg} alt={userProfile.username} />

          {/* Mentee label */}
          <span>{userProfile.userType}</span>

          {/* Name */}
          <h2 className="mentee--profile__container--name">
            {userProfile.username}
          </h2>

          {/* Email */}
          <p>{userProfile.email}</p>

          {/* About */}
          <p className="mentee--profile__container--about">
            {userProfile.aboutMe}
          </p>

          {/* Mentee buttons */}
          {user._id === userProfile._id && (
            <div className="mentee--profile__btns">
              <Link to={"/profile/edit"}>
                <button className="mentee--profile__btns--edit">Edit</button>
              </Link>
              <Link to={"/"}>
                <button
                  className="mentee--profile__btns--logout"
                  onClick={logOutUser}
                >
                  Log out
                </button>
              </Link>
            </div>
          )}

          {/* Posted Questions */}
          {userProfile.questions?.map((question) => {
            return (
              <div key={question._id} className="mentee--profile__question">
                <Link
                  to={`/questions/${question._id}`}
                  className="mentee--profile__link"
                >
                  <img src={question.owner.profileImg} alt=""></img>
                  <h2>{question.title}</h2>
                </Link>
                <p>{question.description}</p>
                <img
                  width="150"
                  height="150"
                  src={question.imageUrl}
                  alt="questionsImage"
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

export default ProfilePage;
