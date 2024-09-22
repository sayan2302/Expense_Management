import axios from 'axios'

// const baseURL = "http://localhost:8000"
const baseURL = "https://expense-management-omega.vercel.app"


export const addExpense = async (payload) => {
    return await axios.post(`${baseURL}/addExpense`, payload)
}

export const getExpenses = async (userId) => {
    return await axios.get(`${baseURL}/getExpenses/${userId}`)
}

export const deleteExpense = async (itemId) => {
    return await axios.delete(`${baseURL}/deleteExpense/${itemId}`, null)
}

export const updateExpense = async (itemId, payload) => {
    return await axios.put(`${baseURL}/updateExpense/${itemId}`, payload)
}
