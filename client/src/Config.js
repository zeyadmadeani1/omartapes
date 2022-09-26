import axios from "axios"
export const axiosInstance=axios.create(
    {
        baseURL:"https://omartube.herokuapp.com/api/"
    })