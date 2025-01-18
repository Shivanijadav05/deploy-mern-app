import React from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { handleError } from '../utils'
import { handleSuccess } from '../utils'
import { useState } from 'react'



function Login(){
    const navigate=useNavigate();
    const [loginInfo,setLoginInfo]=useState({
        
        email:'',
        password:''
    })
    const handleChange=async (e)=>{
        const {name,value}=e.target;
        console.log(name,value);
        const copyLoginInfo={...loginInfo};
        copyLoginInfo[name]=value;
        setLoginInfo(copyLoginInfo)

    }
    const handleLogin=async (e)=>{
        e.preventDefault();
        const {email,password}=loginInfo;
        if( !password || !email)
        {
            return handleError('email and password required ')
        }
        try{
            const url="https://deploy-mern-app-api-ten.vercel.app/auth/login"
            const response=await fetch(url,{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            })
            const result=await response.json();
            const {success,msg,jwtToken,name,error}=result;
            if(success)
            {
                handleSuccess(msg);
                localStorage.setItem('token',jwtToken);
                localStorage.setItem('loggedInUser',name)
                setTimeout(()=>{
                    navigate('/home')
                },1000)
            }
            else if(error)
            {
                const details=error?.details[0].msg;
                handleError(details);
            }else if (!success) {
                handleError(msg );
            }
            console.log(result);
        }
         catch (err) {
            handleError(err);
        }
        }
    
    return (
        <div className='container'>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                
                <div>
                <label htmlFor='email'>Email</label>
                    <input
                     onChange={handleChange}
                    type='email'
                    name='email'
                    autoFocus
                    placeholder='Enter your email'
                    value={loginInfo.email} >
                    </input>
                </div>
                <div>
                <label htmlFor='password'>Password</label>
                    <input
                     onChange={handleChange}
                    type='text'
                    name='password'
                    autoFocus
                    placeholder='Enter your password' 
                    value={loginInfo.password}>
                    </input>
                </div>
                <button type='submit'>Login</button>
                <span>Doesnt have an account?
                    <Link to='/signup'>Signup</Link>
                </span>
            </form>
            <ToastContainer/>
        </div>
    )
}


export default Login
