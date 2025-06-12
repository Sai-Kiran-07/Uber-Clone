import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CaptainLogin = () => {
   const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const navigate = useNavigate();
    const submitHandler = async (e) => {
      e.preventDefault();
      try {
        const captain = {
          email: email,
          password: password
        };

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain);
        const data = response.data;
        
        // Store captain data in localStorage for persistence
        localStorage.setItem('captain', JSON.stringify(data.captain));
        localStorage.setItem('token', data.token);
        
        navigate('/captain-home');
        
        setEmail('');
        setPassword('');
      } catch (error) {
        console.error("Login error:", error);
        alert("Login failed. Please check your credentials.");
      }
    }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className="w-16 mb-10"src='https://w7.pngwing.com/pngs/567/356/png-transparent-uber-logo-decal-lyft-business-text-people-logo-thumbnail.png'/>

      <form onSubmit={(e) => submitHandler(e)}>

        <h3 className='text-lg font-medium mb-2'>What's your email</h3>
        <input 
        className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required 
        type='email' 
        placeholder='email@example.com'/>

        <h3 className='text-lg font-medium mb-2'>Enter password</h3>
        <input 
        className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required 
        type='password' 
        placeholder='password'/>

        <button
        className='bg-[#111] text-white font-semibold mb-2 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
        >Login</button>

        <p className='text-center'>Join a fleet? <Link to='/captain-signup' className='text-blue-600'>Register as a Captain</Link></p>
      </form>
      </div>
      <div>
        <Link
        to='/login'
        className='bg-[#10b461] flex items-center justify-center text-white font-semibold mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'>
          Sign in as User
        </Link>
      </div>
    </div>
  )
}

export default CaptainLogin