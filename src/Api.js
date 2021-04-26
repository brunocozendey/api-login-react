import axios from 'axios';
import { getToken } from "./Services/auth";

axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

const marvelUrl = axios.create({
  baseURL: `https://gateway.marvel.com/v1/public/`
});

const loginUrl = axios.create({
  baseURL: `https://mighty-tundra-25615.herokuapp.com/api/auth`
});

loginUrl.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.post["x-access-token"] = `${token}`;
  }
  return config;
});

const userUrl = axios.create({
  baseURL: `https://mighty-tundra-25615.herokuapp.com/user`
});


export {
  marvelUrl,
  loginUrl,
  userUrl
};


