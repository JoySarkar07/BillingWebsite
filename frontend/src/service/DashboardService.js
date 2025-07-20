import axios from "axios";
import { getApiUrl } from "./Util";

export const getDashboardData = async () => {
  return await axios.get(getApiUrl("dashboard"), {
    headers : {
      "Authorization" : `Bearer ${localStorage.getItem("token")}`
    }
  })
};