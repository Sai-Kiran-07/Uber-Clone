import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CaptainSignup = () => {
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
        <img className="w-16 mb-10"src='https://w7.pngwing.com/pngs/567/356/png-transparent-uber-logo-decal-lyft-business-text-people-logo-thumbnail.png'/>

      <form onSubmit={(e) => submitHandler(e)}>

        <h3 className='text-lg font-medium mb-2'>What's our Captain's name</h3>
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

        <h3 className='text-lg font-medium mb-2'>What's our Captain's email</h3>
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

        <p className='text-center'>Already have a account? <Link to='/captain-login' className='text-blue-600'>Login here</Link></p>
      </form>
      </div>
      <div>
        <p className='text-[10px] mt-6 leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
          Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
      </div>
    </div>
  )
}

export default CaptainSignup