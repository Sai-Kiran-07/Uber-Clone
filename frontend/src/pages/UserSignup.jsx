import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const UserSignup = () => {
  const [email, setemail] = useState('')
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('');
  const [userData, setUserData] = useState({});
  
    const submitHandler = (e) => {
      e.preventDefault();
      setUserData({
        fullName:{
        firstName: firstName,
        lastName: lastName
      },
        email: email,
        password: password
      });
      setFirstName('')
      setLastName('');
      setemail('');
      setPassword('');
    }
  return (
     <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <img className="w-16 mb-10"src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png'/>

      <form onSubmit={(e) => submitHandler(e)}>

        <h3 className='text-lg font-medium mb-2'>What's your name</h3>
        <div className='flex gap-4 mb-6'>
        <input 
        className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base'
        required 
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        type='text' 
        placeholder='first name'/>

        <input 
        className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base'
        required 
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        type='text' 
        placeholder='last name'/>
        </div>

        <h3 className='text-lg font-medium mb-2'>What's your email</h3>
        <input 
        className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
        required 
        value={email}
        onChange={(e) => setemail(e.target.value)}
        type='email' 
        placeholder='email@example.com'/>

        <h3 className='text-lg font-medium mb-2'>Enter password</h3>
        <input 
        className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
        required 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type='password' 
        placeholder='password'/>

        <button
        className='bg-[#111] text-white font-semibold mb-2 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
        >Login</button>

        <p className='text-center'>Already have a account? <Link to='/login' className='text-blue-600'>Login here</Link></p>
      </form>
      </div>
      <div>
        <p className='text-[10px] mt-6 leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
          Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
      </div>
    </div>
  )
}

export default UserSignup 