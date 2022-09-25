import React ,{useEffect, useState} from 'react'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

import {login,reset} from '../../../redux/authSliceLogin'
import Spins from '../../Spinner/Spinner';

function LoginForm() {

  const [values,setValues]=useState({
    email:'',
    password:'' 
  })

  const handleChange=(prop)=>(e)=>{
    setValues({...values,[prop]:e.target.value})
  }
  const handleSubmit=(e)=>{
    e.preventDefault()
    if(values.email && values.password){
      dispatch(login(values))
    }else{
      toast.error('Enter the email and password')
    }
    
  }

  const navigate=useNavigate()
  const dispatch=useDispatch()

  const {user,isError,isLoading,isSuccess,message}=useSelector((state)=>{
return state.authLogin
  })

  useEffect(()=>{
    if (isError) {
      toast.error(message)
    dispatch(reset());
  }

  
  },[isError,isLoading,isSuccess,message])

  if(isLoading){
    return <Spins />
  }

  if(isSuccess){  
    toast.success('Logged in ')
    navigate('/')
    dispatch(reset());
    
   }
  return (
    <div className="container">
    <div className="row bg-light row-container">
      <div className="signup-form">
      {/* {error && <Alert key='danger' variant='danger'>
        {error}
      </Alert>} */}
        <form onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label htmlFor="exampleInputEmail3">Email address</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail3"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              onChange={handleChange('email')}
            />
          </div>
         
         
          
          <div className="form-group">
            <label htmlFor="exampleInputPassword2">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword2"
              placeholder="Password"
              onChange={handleChange('password')}
            />
          </div>
          
        
         
          <button type="submit" className="btn btn-primary mt-2">
            Submit
          </button>
        </form>
        <p className='mt-3'>New here? Register</p>
      </div>
    </div>
  </div>
  )
}

export default LoginForm
