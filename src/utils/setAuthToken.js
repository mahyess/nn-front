import axios from "axios";

const setAuthToken = (token) => {
  // Apply Token tio every requets
  if (token) {
    axios.defaults.headers.common["Authorization"] = `JWT ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
