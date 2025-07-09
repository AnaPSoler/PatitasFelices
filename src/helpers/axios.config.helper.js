import axios from "axios";

const token = JSON.parse(sessionStorage.getItem("token")) || null;

const clientAxios = axios.create({
<<<<<<< Updated upstream
  baseURL: `${import.meta.env.VITE_URL_BACK_LOCAL}/api`,
=======
  baseURL:
    import.meta.env.MODE === "development"
      ? import.meta.env.VITE_URL_BACK_LOCAL
      : import.meta.env.VITE_URL_BACK_DEPLOY,
  withCredentials: true, 
>>>>>>> Stashed changes
});

export const configHeaders = {
  headers: {
    "Content-Type": "application/json",
    auth: `${token}`,
  },
};

export const configHeadersImagen = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

export default clientAxios;
