import React from 'react'

const ConfirmRide = ({setConfirmRidePanel,setVehicleFound}) => {
  return (
    <div>
        <h5 className='p-3 text-center w-[90%] absolute top-0' onClick={()=>{setConfirmRidePanel(false)}}><i className='text-3xl text-gray-200 ri-arrow-down-wide-line'></i></h5>
          <h3 className='text-2xl font-semibold mb-5'>Confirm your  Ride</h3>

          <div className='flex gap-2 justify-between flex-col items-center'>
          <img className='h-20' src='https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398986/assets/90/34c200-ce29-49f1-bf35-e9d250e8217a/original/UberX.png'/>
          <div className='w-full mt-5'>
            <div className='flex items-center gap-5 p-3 border-b-2 border-white'>
                <i className=' ri-map-pin-user-fill'></i>
                <div>
                    <h3 className='text-lg font-medium'>562/11-A</h3>
                    <p className='text-sm -mt-1 text-gray-600'>Kankariya Talab, Bargarh</p>
                </div>
            </div>
            <div className='flex items-center gap-5 p-3 border-b-2 border-white'>
                <i className='text-lg ri-map-pin-2-fill'></i>
                <div>
                    <h3 className='text-lg font-medium'>562/11-A</h3>
                    <p className='text-sm -mt-1 text-gray-600'>Kankariya Talab, Bargarh</p>
                </div>
            </div>
            <div className='flex items-center gap-5 p-3'>
                <i className='ri-currency-line'></i>
                <div>
                    <h3 className='text-lg font-medium'>$193.15</h3>
                    <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                </div>
            </div>
          </div>
          <button onClick={()=>{setVehicleFound(true); setConfirmRidePanel(false)}} className='w-full bg-green-600 text-white font-semibold p-2 rounded-lg mt-5'>Confirm</button>
          </div>
    </div>
  )
}

export default ConfirmRide