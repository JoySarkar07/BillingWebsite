import axios from "axios";
import { getApiUrl } from "./Util";

export const login = (loginData)=>{
    return axios.post(getApiUrl("login"), loginData);
}