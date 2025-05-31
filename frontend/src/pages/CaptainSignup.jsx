import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';


const CaptainSignup = () => {
  const navigate = useNavigate()

  const [email, setemail] = useState('')
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('');
    const [vehicleColor, setVehicleColor] = useState('');
    const [vehiclePlate, setVehiclePlate] = useState('');
    const [vehicleCapacity, setVehicleCapacity] = useState('');
    const [vehicleType, setVehicleType] = useState('');

    const {captain, setCaptain} = useContext(CaptainDataContext);
    
      const submitHandler = async (e) => {
        e.preventDefault();
        const captainData={
          fullname:{
          firstname: firstName,
          lastname: lastName
        },
          email: email,
          password: password,
          vehicle: {
            color: vehicleColor,
            plate: vehiclePlate,
            capacity: Number(vehicleCapacity),
            vehicleType: vehicleType
          }   
        };

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData);
        if (response.status === 201) {
          const data = response.data;
          setCaptain(data.captain);
          localStorage.setItem('token', data.token);
          navigate('/captain-home');
        }



        setFirstName('')
        setLastName('');
        setemail('');
        setPassword('');
        setVehicleColor('');
        setVehiclePlate('');
        setVehicleCapacity('');
        setVehicleType('');
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

        <h3 className='text-lg font-medium mb-2'>Vehicle Details</h3>
        <input 
          className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
          required 
          value={vehicleColor}
          onChange={(e) => setVehicleColor(e.target.value)}
          type='text' 
          placeholder='Vehicle Color'/>

        <input 
          className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
          required 
          value={vehiclePlate}
          onChange={(e) => setVehiclePlate(e.target.value)}
          type='text' 
          placeholder='Vehicle Plate Number'/>

        <input 
          className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
          required 
          value={vehicleCapacity}
          onChange={(e) => setVehicleCapacity(Number(e.target.value))}
          type='number' 
          placeholder='Vehicle Capacity'/>

        <select 
          className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg'
          required
          value={vehicleType}
          onChange={(e) => setVehicleType(e.target.value)}>
          <option value="">Select Vehicle Type</option>
          <option value="car">Car</option>
          <option value="bike">Bike</option>
          <option value="auto">Auto</option>
        </select>

        <button
        className='bg-[#111] text-white font-semibold mb-2 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
        >Create Captain Account</button>

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