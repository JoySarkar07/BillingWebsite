import axios from "axios";
import { getApiUrl } from "./Util";


export const addItem = async (ItemData) => {
  return await axios.post(getApiUrl("admin/items"), ItemData, {
    headers : {
      "Authorization" : `Bearer ${localStorage.getItem("token")}`
    }
  })
};

export const deleteItem = async (ItemId) => {
  return await axios.delete(getApiUrl(`admin/items/${ItemId}`), {
    headers : {
      "Authorization" : `Bearer ${localStorage.getItem("token")}`
    }
  });
};


export const getItems = async () => {
    return await axios.get(getApiUrl("items"), {
    headers : {
      "Authorization" : `Bearer ${localStorage.getItem("token")}`
    }
  });
};