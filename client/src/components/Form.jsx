import React, { useContext, useState } from 'react'
import { MdAddBox } from "react-icons/md";
import { addExpense, getExpenses } from '../services/crud';
import { toast } from 'react-toastify';
import { DataContext } from '../context/AppContext';


const Form = () => {

    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const { setExpenseList, editingId } = useContext(DataContext)


    const getData = async () => {
        try {
            const response = await getExpenses(localStorage.getItem("userId"))
            if (response.status === 200) {
                setExpenseList([...response.data].reverse())
            }
        } catch (error) {
            error?.response?.data ?
                toast.error(error.response?.data, { autoClose: 1500, theme: "colored" })
                :
                toast.error(error.message, { autoClose: 1500, theme: "colored" })
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault()



        const newRecord = {
            userId: localStorage.getItem("userId"),
            date: new Date(),
            description: description,
            amount: parseFloat(amount),
            category: category,
            paymentMethod: paymentMethod,
        }

        try {
            const response = await addExpense(newRecord)
            if (response.status === 200) {
                toast.success(`Expense added!`, { autoClose: 800, theme: "colored" })
                getData()
            }
        } catch (error) {
            error?.response?.data ?
                toast.error(error.response?.data, { autoClose: 1500, theme: "colored" })
                :
                toast.error(error.message, { autoClose: 1500, theme: "colored" })
        }

        setDescription("")
        setAmount("")
        setCategory("")
        setPaymentMethod("")
    }

    return (
        <div className=' mt-4 p-4 rounded text-black 
        zero:w-[350px] phone:w-screen zero:h-[400px] phone:h-[100px]  '>
            <form onSubmit={handleSubmit} className='flex flex-wrap gap-x-4 justify-center items-center'>
                <span className=' text-white max-phone:w-1/2 zero:mb-2 phone:mb-4'>Add Expense: </span>
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="max-phone:w-1/2 border border-gray-300 rounded-md p-3 mb-4 focus:border-blue-500 focus:outline-none shadow-sm transition duration-200"
                />

                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    className="max-phone:w-1/2 border w-[100px] border-gray-300 rounded-md p-3 mb-4 focus:border-blue-500 focus:outline-none shadow-sm transition duration-200"
                />

                <select
                    required
                    className="max-phone:w-1/2 border border-gray-300 rounded-md p-3 mb-4 focus:border-blue-500 focus:outline-none shadow-sm transition duration-200"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">Select a Category</option>
                    <option value="Food">Food</option>
                    <option value="Rent">Rent</option>
                    <option value="Salary">Salary</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Other">Other</option>
                </select>

                <select
                    required
                    className="max-phone:w-1/2 border border-gray-300 rounded-md p-3 mb-4 focus:border-blue-500 focus:outline-none shadow-sm transition duration-200"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                >
                    <option value="">Select a Payment Method</option>
                    <option value="UPI">UPI</option>
                    <option value="Cash">Cash</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                </select>

                <button type='submit'><MdAddBox className='max-phone:mx-16 phone:mb-3 zero:text-5xl phone:text-6xl text-orange-400  hover:text-orange-600 active:text-orange-400 ' /></button>
            </form>
        </div>
    )
}

export default Form
