import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import { useEffect, useContext } from 'react'
import { SocketContext } from '../context/SocketContext'

import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainHome = () => {

    const [ ridePopupPanel, setRidePopupPanel ] = useState(false)
    const [ confirmRidePopupPanel, setConfirmRidePopupPanel ] = useState(false)
    const ridePopupPanelRef = useRef(null)
    const confirmRidePopupPanelRef = useRef(null)
    const [ ride, setRide ] = useState(null)

    const { socket } = useContext(SocketContext)
    const { captain } = useContext(CaptainDataContext)

    useEffect(() => {
        // Try to get captain from localStorage if not available in context
        let captainData = captain;
        if (!captainData || !captainData._id) {
            const storedCaptain = localStorage.getItem('captain');
            if (storedCaptain) {
                try {
                    captainData = JSON.parse(storedCaptain);
                } catch (e) {
                    console.error("Error parsing stored captain data:", e);
                    return; // Exit if we can't get captain data
                }
            } else {
                return; // Exit if no captain data available
            }
        }
        
        console.log("Captain connected with ID:", captainData._id);
        
        socket.emit('join', {
            userId: captainData._id,
            userType: 'captain'
        });
        
        const updateLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    socket.emit('update-location-captain', {
                        userId: captainData._id,
                        location: {
                            ltd: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    });
                }, (error) => {
                    console.error("Geolocation error:", error);
                });
            }
        };

        const locationInterval = setInterval(updateLocation, 10000);
        updateLocation();

        // Add socket event listener inside useEffect
        const handleNewRide = (data) => {
            console.log("New ride received:", data);
            setRide(data);
            setRidePopupPanel(true);
        };
        
        socket.on('new-ride', handleNewRide);

        // Clean up function
        return () => {
            clearInterval(locationInterval);
            socket.off('new-ride', handleNewRide);
        };
    }, [captain, socket])

    async function confirmRide() {
        if (!ride || !ride._id) {
            console.error("Missing ride data:", { ride });
            alert("Ride information is missing. Please refresh the page.");
            return;
        }

        // Get captain from localStorage as backup if context is not available
        let captainData = captain;
        if (!captainData || !captainData._id) {
            const storedCaptain = localStorage.getItem('captain');
            if (storedCaptain) {
                try {
                    captainData = JSON.parse(storedCaptain);
                } catch (e) {
                    console.error("Error parsing stored captain data:", e);
                }
            }
        }

        if (!captainData || !captainData._id) {
            console.error("Missing captain data");
            alert("Captain information is missing. Please log in again.");
            return;
        }

        try {
            console.log("Confirming ride with ID:", ride._id);
            console.log("Captain ID:", captainData._id);
            
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
                rideId: ride._id
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            console.log("Ride confirmed successfully:", response.data);
            // First hide the ride popup panel
            setRidePopupPanel(false);
            
            // Then show the confirm ride popup panel after a short delay
            setTimeout(() => {
                setConfirmRidePopupPanel(true);
                console.log("Setting confirmRidePopupPanel to true");
            }, 100);
        } catch (error) {
            console.error("Error confirming ride:", error?.response?.data || error);
            alert("Failed to confirm ride: " + (error?.response?.data?.message || "Please try again."));
        }
    }


    useGSAP(function () {
        if (ridePopupPanel) {
            gsap.to(ridePopupPanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(ridePopupPanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ ridePopupPanel ])

    // We're now using conditional rendering for the confirmRidePopupPanel, so this animation is no longer needed

    return (
        <div className='h-screen'>
            <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
                <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
                <Link to='/captain-home' className=' h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                    <i className="text-lg font-medium ri-logout-box-r-line"></i>
                </Link>
            </div>
            <div className='h-3/5'>
                <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />

            </div>
            <div className='h-2/5 p-6'>
                <CaptainDetails />
            </div>
            <div ref={ridePopupPanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
                <RidePopUp
                    ride={ride}
                    setRidePopupPanel={setRidePopupPanel}
                    setConfirmRidePopupPanel={setConfirmRidePopupPanel}
                    confirmRide={confirmRide}
                />
            </div>
            {confirmRidePopupPanel && (
                <div ref={confirmRidePopupPanelRef} className='fixed w-full h-screen z-20 bottom-0 bg-white px-3 py-10 pt-12'>
                    <ConfirmRidePopUp
                        ride={ride}
                        setConfirmRidePopupPanel={setConfirmRidePopupPanel} 
                        setRidePopupPanel={setRidePopupPanel} />
                </div>
            )}
        </div>
    )
}

export default CaptainHome