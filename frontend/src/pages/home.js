import React, { useState ,useEffect} from 'react'
import { handleSuccess } from '../utils';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';


function Home(){
    const navigate=useNavigate();
    const [loggedInUser,setLoggedInUser]=useState('');
    useEffect(()=>{
        setLoggedInUser(localStorage.getItem('loggedInUser'))
    },[])

    const handleLogout=(e)=>{
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('token');
        
        handleSuccess('user loggedout');
        setTimeout(()=>{
            navigate('/login')
        },1000)
    }



    return (
        <div>
            <h1>WELCOME {loggedInUser}</h1>
            <button onClick={handleLogout}>Logout</button>
            <ToastContainer/>
        </div>
    )
}

export default Home