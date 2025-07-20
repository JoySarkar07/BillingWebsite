import axios from "axios";
import { getApiUrl } from "./Util";

export const latestOrders = async ()=>{
    return await axios.get(getApiUrl("orders/latest"), {
        headers : {
        "Authorization" : `Bearer ${localStorage.getItem("token")}`
        }
    })
}

export const createOrder = async (order)=>{
    return await axios.post(getApiUrl("orders"), order , {
        headers : {
        "Authorization" : `Bearer ${localStorage.getItem("token")}`
        }
    })
}

export const deleteOrder = async (id)=>{
    return await axios.delete(getApiUrl(`orders/${id}`), {
        headers : {
        "Authorization" : `Bearer ${localStorage.getItem("token")}`
        }
    })
}

