import { createContext, useState } from 'react'

export const DataContext = createContext(null)


const DataProvider = ({ children }) => {

    const [user, setUser] = useState("")
    const [userId, setUserId] = useState("")
    const [expenseList, setExpenseList] = useState([])
    const [editingId, setEditingId] = useState("")


    return (
        <DataContext.Provider
            value={{
                user, setUser,
                userId, setUserId,
                expenseList, setExpenseList,
                editingId, setEditingId
            }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider
