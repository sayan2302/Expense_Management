import React, { useLayoutEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { SignupUser } from '../services/auth';

const Signup = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();



    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await SignupUser({ username, password })
            if (response.status === 200) {
                toast.success('Sign up successful!', { autoClose: 1500, theme: "colored" })
                setTimeout(() => {
                    navigate("/login")
                }, 1000);
            }
        } catch (error) {
            if (error?.response?.data) {
                toast.error(error.response?.data, { autoClose: 1500, theme: "colored" })
            } else {
                toast.error(error.message, { autoClose: 1500, theme: "colored" })
            }

        }

    };

    useLayoutEffect(() => {
        if (localStorage.getItem("user")) {
            navigate('/')
        }
    }, [navigate])


    return (
        <div className="cred signup-form mt-[130px]">
            <span className='text-4xl font-semibold mb-6'>Sign Up</span>

            <form onSubmit={handleSignup} className='max-w-md mx-auto p-6 bg-gray-100 rounded-lg  flex flex-col'>
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
                    Sign Up
                </button>
            </form>

            <p className="mt-4 text-center">
                Already have an account? <Link to="/login" className="text-blue-500 hover:text-blue-700 underline">Login Here</Link>
            </p>
        </div >
    )
}

export default Signup
