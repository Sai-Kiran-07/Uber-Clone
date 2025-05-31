import React from 'react'

const LocationSearchPanel = ({setPanelOpen,setVehiclePanel}) => {
  const locations = [
    "18B, Near Kappor's cafe,Sheryians Coding School,Bhopal",
    "07B, Near Gatapati's cafe,Sheryians Coding School,Bhopal",
    "45B, Near Mutyala's cafe,Sheryians Coding School,Bhopal",
    "10B, Near Putta's cafe,Sheryians Coding School,Bhopal"
  ]
  return (
    <div>
      {
        locations.map(function(elem,id){
          return <div key={id} onClick={()=>{
            setVehiclePanel(true)
            setPanelOpen(false)
            }} className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'>
        <h2 className='bg-[#eee] h-10 flex items-center justify-center w-16 rounded-full'><i className="ri-map-pin-fill"></i></h2>
        <h4 className='font-medium'>{elem}</h4>
      </div>
        })
      }
    </div>
  )
}

export default LocationSearchPanel