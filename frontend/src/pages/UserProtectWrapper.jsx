import React,{useContext, useEffect}from 'react'
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/userContext';

const UserProtectWrapper = ({children}) => {
    const token = localStorage.getItem('token'); 
    const navigate = useNavigate();
    useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token]);

  return (
    <>
      {token && children}
    </>
  );
}

export default UserProtectWrapper