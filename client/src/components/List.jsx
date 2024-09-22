import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../context/AppContext'
import { deleteExpense, getExpenses, updateExpense } from '../services/crud'
import { toast } from 'react-toastify'
import { MdOutlineDelete } from 'react-icons/md'
import { FiEdit, FiSave } from "react-icons/fi";

const List = () => {

    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');


    const { expenseList, setExpenseList, editingId, setEditingId } = useContext(DataContext)


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

    const handleDelete = async (itemId) => {
        try {
            const response = await deleteExpense(itemId)
            if (response.status === 200) {
                toast.success(`Expense deleted!`, { autoClose: 800, theme: "colored" })
                getData()
            }
        } catch (error) {
            error?.response?.data ?
                toast.error(error.response?.data, { autoClose: 1500, theme: "colored" })
                :
                toast.error(error.message, { autoClose: 1500, theme: "colored" })
        }
    }


    const handleEdit = async (itemId) => {
        if (editingId) {
            toast.warning(`Save unfinished editing first!`, { autoClose: 2000, theme: "dark" })
            return
        }
        setEditingId(itemId)

        const currentItem = expenseList.find(item => item._id === itemId);

        setDescription(currentItem.description)
        setAmount(currentItem.amount)
        setCategory(currentItem.category)
        setPaymentMethod(currentItem.paymentMethod)
    }

    const handleSave = async (itemId) => {

        const newRecord = {
            userId: localStorage.getItem("userId"),
            date: new Date(),
            description: description,
            amount: parseFloat(amount),
            category: category,
            paymentMethod: paymentMethod,
        }

        try {
            const response = await updateExpense(itemId, newRecord)
            if (response.status === 200) {
                toast.success(`Expense Updated!`, { autoClose: 800, theme: "colored" })
                getData()
            }
        } catch (error) {
            error?.response?.data ?
                toast.error(error.response?.data, { autoClose: 1500, theme: "colored" })
                :
                toast.error(error.message, { autoClose: 1500, theme: "colored" })
        }
        setEditingId("")
        setDescription("")
        setAmount("")
        setCategory("")
        setPaymentMethod("")

    }

    useEffect(() => { getData() }, [])

    return (
        <div className='overflow-x-auto w-[90vw] mx-auto select-none'>
            {expenseList.length === 0 &&
                <p className='border border-dashed w-fit mx-auto p-2 mt-20 text-xl text-red-400'>No expences to display!</p>
            }
            {expenseList.length > 0 &&
                < table className='min-w-full  border border-gray-200'>
                    <thead className='bg-gray-100'>
                        <tr>
                            <th className='text-black p-3 border-b'>Description</th>
                            <th className='text-black p-3 border-b'>Amount</th>
                            <th className='text-black p-3 border-b'>Category</th>
                            <th className='text-black p-3 border-b'>Payment Method</th>
                            <th className='text-black p-3 border-b'>Last Modified</th>
                            <th className='text-black p-3 border-b'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenseList.map((item, idx) => {
                            return (
                                <tr key={item.date} className='border-b'>
                                    {editingId === item._id ?
                                        <>
                                            <td className='p-3'>
                                                <input
                                                    type="text"
                                                    onChange={(e) => setDescription(e.target.value)}
                                                    defaultValue={item.description}
                                                    required
                                                    className="min-w-[300px] bg-red-300 text-center text-black border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none shadow-sm transition duration-200"
                                                />
                                            </td>
                                            <td className='p-3'>
                                                <input
                                                    type="text"
                                                    onChange={(e) => setAmount(e.target.value)}
                                                    defaultValue={item.amount}
                                                    required
                                                    className="w-[100px] bg-red-300 text-center text-black border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none shadow-sm transition duration-200"
                                                />
                                            </td>
                                            <td className='p-3'>
                                                <select
                                                    required
                                                    className="bg-red-300 text-black border border-gray-300 rounded-md  focus:border-blue-500 focus:outline-none shadow-sm transition duration-200"
                                                    defaultValue={item.category}
                                                    onChange={(e) => setCategory(e.target.value)}
                                                >
                                                    <option value="Food">Food</option>
                                                    <option value="Rent">Rent</option>
                                                    <option value="Salary">Salary</option>
                                                    <option value="Utilities">Utilities</option>
                                                    <option value="Entertainment">Entertainment</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </td>
                                            <td className='p-3'>
                                                <select
                                                    required
                                                    className="bg-red-300 text-black border border-gray-300 rounded-md  focus:border-blue-500 focus:outline-none shadow-sm transition duration-200"
                                                    defaultValue={item.paymentMethod}
                                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                                >
                                                    <option value="UPI">UPI</option>
                                                    <option value="Cash">Cash</option>
                                                    <option value="Bank Transfer">Bank Transfer</option>
                                                </select>
                                            </td>
                                        </>
                                        :
                                        <>
                                            <td className='p-3'>{item.description}</td>
                                            <td className='p-3'>{item.amount}</td>
                                            <td className='p-3'>{item.category}</td>
                                            <td className='p-3'>{item.paymentMethod}</td>
                                        </>
                                    }
                                    <td className='p-3'>
                                        {new Date(item.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}{" - "}
                                        {new Date(item.date).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                    </td>

                                    <td className='p-3 flex items-center justify-center gap-x-4'>
                                        {item._id === editingId ?
                                            <FiSave onClick={() => handleSave(item._id)} className='text-[22px] hover:text-blue-400 active:text-[#ffe4c4]' />
                                            :
                                            <FiEdit onClick={() => handleEdit(item._id)} className='text-[22px] hover:text-blue-400 active:text-[#ffe4c4]' />
                                        }
                                        <MdOutlineDelete onClick={() => handleDelete(item._id)} className='text-[28px] hover:text-red-400 active:text-[#ffe4c4]' />
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>}
        </div >

    )
}

export default List
