import axios from "axios";

class Profile {
  constructor() {
    this.app = axios.create({
      baseURL: `${import.meta.env.VITE_API_URL}`,
    });

    this.app.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  getOneUser = (id) => {
    return this.app.get(`/profile/${id}`);
  };

  editUser = (id, info) => {
    return this.app.patch(`/profile/${id}/edit`, info);
  };
}

const profile = new Profile();

export default profile;