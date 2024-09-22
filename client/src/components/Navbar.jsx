import React, { useContext } from 'react'
import { DataContext } from '../context/AppContext'
import { PiPiggyBankFill } from "react-icons/pi";

const Navbar = () => {

    const { user, setUser, setUserId, setExpenseList } = useContext(DataContext)




    const logout = () => {
        localStorage.clear()
        setUser("")
        setUserId("")
        setExpenseList([])
    }

    return (
        <div className='navbar' >
            <div className="flex items-center">
                <PiPiggyBankFill className='text-4xl mr-3 text-red-600' />
                <span className='text-2xl font-[600] text-[#282c34]'> Expense Tracker</span>
            </div>

            <span className=''></span>

            {user &&
                <button onClick={logout} className="float-right bg-red-600 text-white font-semibold py-1 px-2 mt-1 rounded-[8px] shadow hover:bg-red-700 transition duration-300">
                    Logout
                </button>

            }
        </div >
    )
}

export default Navbar
