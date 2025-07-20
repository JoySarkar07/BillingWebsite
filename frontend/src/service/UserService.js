import axios from "axios";
import { getApiUrl } from "./Util";


export const addUser = async (userData) => {
  return await axios.post(getApiUrl("admin/register"), userData, {
    headers : {
      "Authorization" : `Bearer ${localStorage.getItem("token")}`
    }
  })
};

export const deleteUser = async (userId) => {
  return await axios.delete(getApiUrl(`admin/users/${userId}`), {
    headers : {
      "Authorization" : `Bearer ${localStorage.getItem("token")}`
    }
  });
};


export const getUsers = async () => {
    return await axios.get(getApiUrl("admin/users"), {
    headers : {
      "Authorization" : `Bearer ${localStorage.getItem("token")}`
    }
  });
};