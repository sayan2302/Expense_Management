import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import { useContext, useEffect } from 'react';
import { DataContext } from './context/AppContext';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Signup from './components/Signup';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {


  const { user, setUser, setUserId } = useContext(DataContext)
  // const userLocal = localStorage.getItem("user")

  useEffect(() => {
    try {
      setUser(localStorage.getItem("user"))
      setUserId(localStorage.getItem("userId"))
    } catch (err) {
      toast.error(err, { autoClose: 1500, theme: "colored" })
    }
  }, [setUser, setUserId])


  return (
    <BrowserRouter>
      <div className="App h-screen flex flex-col items-center ">
        <ToastContainer />
        <Navbar />
        <Routes>
          <Route path='/' element={user ? <Dashboard /> : <Navigate to="/login" replace />} />
          <Route path='/login' element={!user ? <Login /> : <Navigate to="/" replace />} />
          <Route path='/signup' element={!user ? <Signup /> : <Navigate to="/" replace />} />
          <Route path='*' element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
