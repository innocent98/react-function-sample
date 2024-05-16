import axios from "axios";
import React from "react";

const requestMethod = () => {
  // retrieve user from anywhere it's being saved
  //   user or user token can be saved locally anyhow you want it but should be stored securely
  const user = {};

  const TOKEN = user?.accessToken;

  //   user request can be called/used for any type http APIs call
  //   e.g POST, GET, PUT, DELETE
  const userRequest = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_API_URL,
    headers: { token: `Bearer ${TOKEN}` },
  });

  return { userRequest };
};

export default requestMethod;
