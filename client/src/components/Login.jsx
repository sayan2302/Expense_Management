import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LoginUser } from '../services/auth';
import { toast } from 'react-toastify';
import { DataContext } from '../context/AppContext';

const Login = () => {

    const { setUser, setUserId } = useContext(DataContext)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();



    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await LoginUser({ username, password })
            if (response.status === 200) {
                toast.success(`Welcome ${response.data.username}!`, { autoClose: 1500, theme: "colored" })
                localStorage.setItem("user", response.data.username)
                localStorage.setItem("userId", response.data.userId)
                setUser(response.data.username)
                setUserId(response.data.userId)
                navigate("/");
            }
        } catch (error) {
            error?.response?.data ?
                toast.error(error.response?.data, { autoClose: 1500, theme: "colored" })
                :
                toast.error(error.message, { autoClose: 1500, theme: "colored" })

        }

    }

    return (
        <div className="cred login-form mt-[130px] ">

            <span className='text-4xl font-semibold mb-6'>Login</span>

            <form onSubmit={handleLogin} className='max-w-md mx-auto p-6 bg-gray-100 rounded-lg  flex flex-col'>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="border border-gray-300 rounded-md p-2 mb-4 focus:border-blue-500 focus:outline-none"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border border-gray-300 rounded-md p-2 mb-4 focus:border-blue-500 focus:outline-none"
                />
                <button className="bg-blue-800 text-white font-semibold py-2 px-4 rounded shadow hover:bg-blue-900 transition duration-300"
                    type="submit">
                    Login
                </button>
            </form>
            <p className="mt-4 text-center">
                Don't have an account? <Link to="/signup" className="text-blue-500 hover:text-blue-700 underline">Sign Up Here</Link>
            </p>

        </div>
    )
}

export default Login
