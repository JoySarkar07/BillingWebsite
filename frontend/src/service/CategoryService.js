import axios from "axios";
import { getApiUrl } from "./Util";

export const addCategory = async (categoryData) => {
  return await axios.post(getApiUrl("admin/categories"), categoryData, {
    headers : {
      "Authorization" : `Bearer ${localStorage.getItem("token")}`
    }
  })
};

export const deleteCategory = async (categoryId) => {
  return await axios.delete(getApiUrl(`admin/categories/${categoryId}`), {
    headers : {
      "Authorization" : `Bearer ${localStorage.getItem("token")}`
    }
  });
};


export const getCategories = async () => {
    return await axios.get(getApiUrl("categories"), {
    headers : {
      "Authorization" : `Bearer ${localStorage.getItem("token")}`
    }
  });
};