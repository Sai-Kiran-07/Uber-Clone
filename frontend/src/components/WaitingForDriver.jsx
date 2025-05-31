import React from 'react'

const WaitingForDriver = ({waitingForDriver}) => {
  return (
    <div>
        <h5 className='p-3 text-center w-[90%] absolute top-0' onClick={()=>{setVehicleFound(false)}}><i className='text-3xl text-gray-200 ri-arrow-down-wide-line'></i></h5>

        <div className='flex items-center justify-between'>
          <img className='h-20' src='https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1688398986/assets/90/34c200-ce29-49f1-bf35-e9d250e8217a/original/UberX.png'/>
          <div className='text-right'>
            <h2 className='text-lg font-medium'>Kiran</h2>
            <h4 className='text-xl font-semibold -mt-1 -mb-1'>OD 17 AB 5555</h4>
            <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
          </div>
        </div>

          <div className='flex gap-2 justify-between flex-col items-center'>
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
          </div>

    </div>
  )
}

export default WaitingForDriver