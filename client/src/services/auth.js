import axios from 'axios'

const baseURL = "http://localhost:8000"


export const SignupUser = async (payload) => {
    return await axios.post(`${baseURL}/signup`, payload)
}


export const LoginUser = async (payload) => {
    return await axios.post(`${baseURL}/login`, payload)
}