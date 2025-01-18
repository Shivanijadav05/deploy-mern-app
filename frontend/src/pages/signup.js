import React from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { handleError } from '../utils'
import { handleSuccess } from '../utils'
import { useState } from 'react'
function Signup(){
    const navigate=useNavigate();
    const [signupInfo,setSignupInfo]=useState({
        name:'',
        email:'',
        password:''
    })
    const handleChange=async (e)=>{
        const {name,value}=e.target;
        console.log(name,value);
        const copySignupInfo={...signupInfo};
        copySignupInfo[name]=value;
        setSignupInfo(copySignupInfo)

    }
    const handleSignup=async (e)=>{
        e.preventDefault();
        const {name,email,password}=signupInfo;
        if(!name || !password || !email)
        {
            return handleError('name,email and password required ')
        }
        try{
            const url=`https://deploy-mern-app-ten.vercel.app/auth/signup`
            const response=await fetch(url,{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)
            })
            const result=await response.json();
            const {success,message,error}=result;
            if(success)
            {
                handleSuccess(message);
                setTimeout(()=>{
                    navigate('/login')
                },1000)
            }
            else if(error)
            {
                const details=error?.details[0].message;
                handleError(details);
            }else if (!success) {
                handleError(message);
            }
            console.log(result);
        }
         catch (err) {
            handleError(err);
        }
        }
    
    return (
        <div className='container'>
            <h1>Signup</h1>
            <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor='name'>Name</label>
                    <input
                    onChange={handleChange}
                    type='text'
                    name='name'
                    autoFocus
                    placeholder='Enter your name'
                    value={signupInfo.name} >
                        
                    </input>
                </div>
                <div>
                <label htmlFor='email'>Email</label>
                    <input
                     onChange={handleChange}
                    type='email'
                    name='email'
                    autoFocus
                    placeholder='Enter your email'
                    value={signupInfo.email} >
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
                    value={signupInfo.password}>
                    </input>
                </div>
                <button type='submit'>Signup</button>
                <span>Already have an account?
                    <Link to='/login'>Login</Link>
                </span>
            </form>
            <ToastContainer/>
        </div>
    )
}


export default Signup
