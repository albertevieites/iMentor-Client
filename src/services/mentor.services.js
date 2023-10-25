import axios from "axios";

class Mentor {
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

  getAllMentors = () => {
    return this.app.get("/mentors");
  };
}

const mentors = new Mentor();

export default mentors;
