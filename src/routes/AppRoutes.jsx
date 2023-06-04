import { Route, Routes } from "react-router-dom";

import AddForm from "../components/AddForm/AddForm";
import Chat from "../pages/Chat/Chat";
import ChatList from "../pages/ChatList/ChatList";
import EditProfilePage from "../pages/EditProfile/EditProfile";
import EditQuestionPage from "../pages/EditQuestion/EditQuestion";
import Home from "../pages/Home/Home";
import LoginPage from "../pages/Login/Login";
import Mentor from "../pages/Mentors/Mentors";
import Profile from "../pages/Profile/Profile";
import Question from "../pages/Question/Question";
import QuestionDetails from "../pages/QuestionDetails/QuestionDetails";
import Signup from "../pages/Signup/Signup";
import NotLoggedInRoute from "./NotLoggedInRoute";
import PrivateRoute from "./PrivateRoute";

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

      <Route path="/questions" element={<PrivateRoute />}>
        <Route path="" element={<Question />} />
      </Route>

      <Route path="/mentors" element={<PrivateRoute />}>
        <Route path="" element={<Mentor />} />
      </Route>

      <Route path="/addquestion" element={<PrivateRoute />}>
        <Route path="" element={<AddForm />} />
      </Route>

      <Route path="/questions/:id" element={<PrivateRoute />}>
        <Route path="" element={<QuestionDetails />} />
      </Route>

      <Route path="/question/:id/edit" element={<PrivateRoute />}>
        <Route path="" element={<EditQuestionPage />} />
      </Route>

      <Route path="/profile/:id" element={<PrivateRoute />}>
        <Route path="" element={<Profile />} />
      </Route>

      <Route path="/profile/edit" element={<PrivateRoute />}>
        <Route path="" element={<EditProfilePage />} />
      </Route>

      <Route path="/chats/:id" element={<PrivateRoute />}>
        <Route path="" element={<ChatList />} />
      </Route>

      <Route path="/chats/:id/:otherId" element={<PrivateRoute />}>
        <Route path="" element={<Chat />} />
      </Route>

      <Route path="*" element={<h1>Super-duper error 404</h1>} />
    </Routes>
  );
};

export default AppRoutes;
