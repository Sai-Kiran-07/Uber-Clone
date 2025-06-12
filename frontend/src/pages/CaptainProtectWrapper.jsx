import React, { useContext, useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainProtectWrapper = ({
    children
}) => {

    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const { captain, setCaptain } = useContext(CaptainDataContext)
    const [ isLoading, setIsLoading ] = useState(true)

    useEffect(() => {
        if (!token) {
            navigate('/captain-login');
            return;
        }

        // Try to get captain from localStorage first for immediate rendering
        const storedCaptain = localStorage.getItem('captain');
        if (storedCaptain) {
            try {
                const parsedCaptain = JSON.parse(storedCaptain);
                setCaptain(parsedCaptain);
                // Don't set isLoading to false yet, still verify with server
            } catch (e) {
                console.error("Error parsing stored captain data:", e);
            }
        }

        // Always verify with server
        axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (response.status === 200) {
                setCaptain(response.data.captain);
                // Update localStorage with fresh data
                localStorage.setItem('captain', JSON.stringify(response.data.captain));
                setIsLoading(false);
            }
        }).catch(err => {
            console.error("Error fetching captain profile:", err);
            localStorage.removeItem('token');
            localStorage.removeItem('captain');
            navigate('/captain-login');
        });
    }, [token, navigate, setCaptain])

    

    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }



    return (
        <>
            {children}
        </>
    )
}

export default CaptainProtectWrapper