import axios from "axios"
export const axiosInstance=axios.create(
    {
        baseURL:"http://omartube.herokuapp.com/"
    })