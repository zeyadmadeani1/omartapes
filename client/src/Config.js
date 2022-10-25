import axios from "axios"
export const axiosInstance=axios.create(
    {
        baseURL:"https://omartapes.vercel.app/api/"
    })
