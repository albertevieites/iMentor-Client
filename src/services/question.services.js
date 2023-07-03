import axios from "axios";

class Questions {
  constructor() {
    this.app = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}`,
    });

    this.app.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  getAllQuestions = () => this.app.get("/questions");

  getOneQuestion = (id) => this.app.get(`/questions/${id}`);

  createQuestion = (question) => this.app.post("/questions", question);

  editQuestion = (question, id) =>
    this.app.post(`/questions/${id}/edit`, question);

  deleteQuestion = (id) => this.app.post(`/questions/${id}/delete`);

  createComment = (comment, id) =>
    this.app.post(`/questions/${id}/comment/add`, comment);
}

const questions = new Questions();

export default questions;

/* import { useState, useEffect } from 'react';
import axios from 'axios';

const useAxiosInstance = () => {
  const [instance, setInstance] = useState(null);

  useEffect(() => {
    const app = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}`,
    });

    app.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem('authToken');

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });

    setInstance(app);
  }, []);

  return instance;
};

const useQuestionsAPI = () => {
  const app = useAxiosInstance();

  const getAllQuestions = () => {
    return app.get('/questions');
  };

  const getOneQuestion = (id) => {
    return app.get(`/questions/${id}`);
  };

  const createQuestion = (question) => {
    return app.post('/questions', question);
  };

  const editQuestion = (question, id) => {
    return app.post(`/questions/${id}/edit`, question);
  };

  const deleteQuestion = (id) => {
    return app.post(`/questions/${id}/delete`);
  };

  const createComment = (comment, id) => {
    return app.post(`/questions/${id}/comment/add`, comment);
  };

  return {
    getAllQuestions,
    getOneQuestion,
    createQuestion,
    editQuestion,
    deleteQuestion,
    createComment,
  };
};

export default useQuestionsAPI; */
