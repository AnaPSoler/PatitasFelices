import axios from "axios";

const clientAxios = axios.create({
  baseURL: import.meta.env.MODE === "development"
    ? "http://localhost:3001/api"
    : "https://patitas-felices-backend.vercel.app/api",
  withCredentials: true,
});


export const getAuthHeaders = () => {
  const token = sessionStorage.getItem("token");
  return {
    headers: {
      Authorization: token,
    },
  };
};

export default clientAxios;
