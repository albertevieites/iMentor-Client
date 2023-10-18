import { Route, Routes } from "react-router-dom";

import EditProfile from "../pages/EditProfile/EditProfile";
import Feed from "../pages/Feed/Feed";
import Home from "../pages/Home/Home";
import LoginPage from "../pages/Login/Login";
import Mentor from "../pages/Mentors/Mentors";
import Profile from "../pages/Profile/Profile";
import QuestionDetails from "../pages/QuestionDetails/QuestionDetails";
import Signup from "../pages/Signup/Signup";
import NotLoggedInRoute from "./NotLoggedInRoute";
import PrivateRoute from "./PrivateRoute";
import AddQuestion from "../pages/AddQuestion/AddQuestion";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<NotLoggedInRoute />}>
        <Route path="" element={<Home />} />
      </Route>

      <Route path="/signup" element={<NotLoggedInRoute />}>
        <Route path="" element={<Signup />} />
      </Route>

      <Route path="/login" element={<NotLoggedInRoute />}>
        <Route path="" element={<LoginPage />} />
      </Route>

      <Route path="/feed" element={<PrivateRoute />}>
        <Route path="" element={<Feed />} />
      </Route>

      <Route path="/mentors" element={<PrivateRoute />}>
        <Route path="" element={<Mentor />} />
      </Route>

      <Route path="/addquestion" element={<PrivateRoute />}>
        <Route path="" element={<AddQuestion />} />
      </Route>

      <Route path="/questions/:id" element={<PrivateRoute />}>
        <Route path="" element={<QuestionDetails />} />
      </Route>

      <Route path="/question/:id/edit" element={<PrivateRoute />}>
        <Route path="" element={<AddQuestion />} />
      </Route>

      <Route path="/profile/:id" element={<PrivateRoute />}>
        <Route path="" element={<Profile />} />
      </Route>

      <Route path="/profile/edit" element={<PrivateRoute />}>
        <Route path="" element={<EditProfile />} />
      </Route>

      <Route path="*" element={<h1>⚠️ error 404 ⚠️</h1>} />
    </Routes>
  );
};

export default AppRoutes;
