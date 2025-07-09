import axios from "axios";

const clientAxios = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? import.meta.env.VITE_URL_BACK_LOCAL + "/api"
      : import.meta.env.VITE_URL_BACK_DEPLOY + "/api",
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
