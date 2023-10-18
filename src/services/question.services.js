import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
});

api.interceptors.request.use((config) => {
  const storedToken = localStorage.getItem("authToken");

  if (storedToken) {
    config.headers = { Authorization: `Bearer ${storedToken}` };
  }

  return config;
});

  export const getAllQuestions = () => api.get("/questions");

  export const getOneQuestion = (id) => api.get(`/questions/${id}`);

  export const createQuestion = (question) => api.post("/questions", question);

  export const editQuestion = (question, id) =>
    api.post(`/questions/${id}/edit`, question);

  export const deleteQuestion = (id) => api.post(`/questions/${id}/delete`);

  export const createComment = (comment, id) =>
    api.post(`/questions/${id}/comment/add`, comment);
