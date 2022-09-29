import axios from "axios"
export const axiosInstance=axios.create(
    {
        baseURL:"https://omartapes.herokuapp.com/api/"
    })
    