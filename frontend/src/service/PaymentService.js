import axios from "axios";
import { getApiUrl } from "./Util";

export const createRazorpayOrder = async (data)=>{
    return await axios.post(getApiUrl("payments/create-order"), data, {
        headers : {
        "Authorization" : `Bearer ${localStorage.getItem("token")}`
        }
    })
}

export const verifyPayment = async (paymentData)=>{
    return await axios.post(getApiUrl("payments/verify"), paymentData, {
        headers : {
        "Authorization" : `Bearer ${localStorage.getItem("token")}`
        }
    })
}