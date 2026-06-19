import axios from "axios";

const API = axios.create({
  baseURL: "http://16.170.17.22:8080/api",
});
export default API;
