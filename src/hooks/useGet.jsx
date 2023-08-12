/* eslint-disable react-hooks/exhaustive-deps */
import headerWithBearer from "@/utils/headerWithBearer";
import axios from "axios";
import { useEffect, useState } from "react";

export default function useGet(url,queryOptions = null, isBearer = false, isPaginate = false) {
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)
    const [success,setSuccess] = useState(false)
    const [error,setError] = useState(false)
    const [pagination,setPagination] = useState({
        page:1,
        total:1,
        limit:10,
    })

    async function get() {
        let options = null
        if (queryOptions) {
            options = new URLSearchParams(queryOptions).toString()
        }
        setLoading(true)
        try {
            const response = await axios.get(`${url}?${options ?? ''}`,isBearer && headerWithBearer())
            setData(response.data.data)
            if (isPaginate) {
                setPagination({
                    page:response.data.page,
                    limit:response.data.limit,
                    total:response.data.totalData
                })
            }
            setSuccess(true)
        } catch (error) {
            setError(true)
            console.error(error);
        } finally{
            setLoading(false)
        }
    }

    const refetch = () =>{
        setData([])
        setSuccess(false)
        setError(false)
        get()
    }

    useEffect(()=>{
        get()
    },[])

    return {data,loading,success,error,pagination,refetch,setData}
}