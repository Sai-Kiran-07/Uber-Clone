import React, { useRef, useState } from 'react'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';

const Home = () => {

  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const [vehiclePanel,setVehiclePanel] = useState(false);
  const [confirmRidePanel,setConfirmRidePanel] = useState(false);
  const [vehicleFound,setVehicleFound] = useState(false);
  const [waitingForDriver,setWaitingForDriver] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    
  }

  useGSAP(()=>{
    if(panelOpen){
      gsap.to(panelRef.current,{
        height:'70%',
        opacity:1,
        padding:24,
      })
      gsap.to(panelCloseRef.current,{
        opacity:1
      })
    }else{
      gsap.to(panelRef.current,{
        height:0,
        opacity:0,
        padding:0,
      })
      gsap.to(panelCloseRef.current,{
        opacity:0
      })
    }
  },[panelOpen])

  useGSAP(()=>{
    if(vehiclePanel){
      gsap.to(vehiclePanelRef.current,{
        transform:'translateY(0)'
      },)
    }else{
      gsap.to(vehiclePanelRef.current,{
        transform:'translateY(100%)'
      })
    } 
  },[vehiclePanel])

  useGSAP(()=>{
    if(confirmRidePanel){
      gsap.to(confirmRidePanelRef.current,{
        transform:'translateY(0)'
      },)
    }else{
      gsap.to(confirmRidePanelRef.current,{
        transform:'translateY(100%)'
      })
    } 
  },[confirmRidePanel])

  useGSAP(()=>{
    if(vehicleFound){
      gsap.to(vehicleFoundRef.current,{
        transform:'translateY(0)'
      },)
    }else{
      gsap.to(vehicleFoundRef.current,{
        transform:'translateY(100%)'
      })
    } 
  },[vehicleFound])

  useGSAP(()=>{
    if(waitingForDriver){
      gsap.to(waitingForDriverRef.current,{
        transform:'translateY(0)'
      },)
    }else{
      gsap.to(waitingForDriverRef.current,{
        transform:'translateY(100%)'
      })
    } 
  },[waitingForDriver])

  return (
    <div className='h-screen relative overflow-hidden'>
      <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png" alt="" />
        <div className='h-screen w-screen'>
          <img className=' w-full h-full object-cover' src="https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F4yr3urquq9fszbadhg93.png" alt="" />
        </div>

        <div className=' flex flex-col justify-end h-screen absolute top-0 w-full'>
          <div className='h-[30%] p-5 bg-white relative'>
            <h5 ref={panelCloseRef} onClick={()=>setPanelOpen(false)} className='absolute opacity-0 top-6 right-6 text-2xl'>
              <i className='ri-arrow-down-wide-line'></i>
            </h5>
             <h4 className='text-2xl font-semibold'>Find a trip</h4>
             
             <form onSubmit={(e) => submitHandler(e)} >
              <div className="line absolute h-16 w-1 top-[45%] left-10 bg-gray-700 rounded-full"></div>
               <input 
                className="bg-[#eee] px-12 py-2 text-lg w-full mt-5"  
                value={pickup}
                onClick={()=>setPanelOpen(true)}
                onChange={(e) => setPickup(e.target.value)}
                type='text' placeholder='Add a pick-up location'/>

               <input 
                className="bg-[#eee] px-12 py-2 text-lg w-full mt-3" 
                value={destination}
                onClick={()=>setPanelOpen(true)}
                onChange={(e) => setDestination(e.target.value)}
                type='text' placeholder='Enter your destination'/>
             </form>
          </div>
          <div ref={panelRef} className='h-0 bg-white opacity-0'>
            <LocationSearchPanel setPanelOpen={setPanelOpen} setVehiclePanel={setVehiclePanel}/>
          </div>
        </div>
        <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full px-3 py-10 pt-14 bg-white'>
          <VehiclePanel setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel}/>
        </div>
        <div ref={confirmRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full px-3 py-6 pt-12 bg-white'>
          <ConfirmRide setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound}/>
        </div>
        <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 translate-y-full px-3 py-6 pt-12 bg-white'>
          <LookingForDriver setVehicleFound={setVehicleFound}/>
        </div>
        <div ref={waitingForDriverRef} className='fixed w-full z-10 bottom-0 px-3 py-6 pt-12 bg-white'>
          <WaitingForDriver waitingForDriver={waitingForDriver}/>
        </div>
    </div>
  )
} 

export default Home