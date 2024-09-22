import React, { useContext } from 'react'
import { DataContext } from '../context/AppContext';
import Form from './Form';
import List from './List';

const Dashboard = () => {

    const { user } = useContext(DataContext)

    function capitalize(str) {
        if (!str) return ''; // Handle empty string
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    return (
        <div className='mt-[110px]'>
            <span className='text-2xl bg-orange-300 font-[600] text-[#282c34] shadow-md px-4 rounded-md shadow-orange-700'>{capitalize(user)}'s Expenses</span>
            <Form />
            <List />

        </div>
    )
}

export default Dashboard
