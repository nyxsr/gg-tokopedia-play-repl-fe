import headerWithBearer from "@/utils/headerWithBearer";
import axios from "axios";
import { useState } from "react";

export default function usePost() {
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)
    const [success,setSuccess] = useState(false)
    const [error,setError] = useState(false)
    const [errorMessage,setErrorMessage] = useState('');

    async function post(url,body,isBearer = false) {
        setLoading(true)
        try {
            const response = await axios.post(`${url}`,body,isBearer && headerWithBearer())
            setData(response.data.data)
            setSuccess(true)
        } catch (error) {
            setError(true)
            setErrorMessage(error.response.data.meta.message)
            console.error(error);
        } finally{
            setLoading(false)
        }
    }

    return {data,loading,success,error,errorMessage,post}
}