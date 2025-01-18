import axios from "axios";

export const login = ({ email, password }) => {
  return axios.post("/api/auth/login", {
    email,
    password,
  });
};

export const register = ({ name, email, password }) => {
  return axios.post("/api/auth/register", {
    email,
    password,
    name,
  });
};

export const logout = () => {
  return axios.get("/api/auth/logout");
};

export const getCurrentUser = () => {
  return axios.get("/api/auth/current-user");
};
