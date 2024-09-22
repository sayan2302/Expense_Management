import axios from 'axios'

// const baseURL = "http://localhost:8000"
const baseURL = "https://expense-management-omega.vercel.app"




export const SignupUser = async (payload) => {
    return await axios.post(`${baseURL}/signup`, payload)
}


export const LoginUser = async (payload) => {
    return await axios.post(`${baseURL}/login`, payload)
}