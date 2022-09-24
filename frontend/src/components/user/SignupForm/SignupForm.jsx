import React,{useState,useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {signup,reset} from '../../../redux/authSlice'

import './SignupForm.css'
import {signupSchema} from '../../../Validations/validations'
import Alert from 'react-bootstrap/Alert';

function SignupForm() {
    const [values, setValues] = useState({
        name:'',
        email:'',
        password:'',
        confirmPassword:''
    
        
      });
      const [error,setError]=useState()
      const navigate=useNavigate()
      const dispatch=useDispatch()

      const {user,isLoading,isError,isSuccess,message}=useSelector((state)=>{
        return state.auth
      })

      useEffect(() => {
        if (isError) {
            <Alert key='dange' variant='dange' >
            User created Succesfully,Please login.
          </Alert>
          dispatch(reset());
        }

        if(isSuccess){
           toast.success('User created successfully')
           navigate('/login')
          }
    
          if(isLoading){
            alert('loading')
          }
      },[isError,isLoading,isSuccess,dispatch,message]);

     
      

      const handleChange=(prop)=>(event)=>{
        setError()
        setValues({...values,[prop]:event.target.value})
       
      }

      const handleSubmit=async(e)=>{
        e.preventDefault()
        await signupSchema.validate(values,{abortEarly:false}).then((response)=>{
            console.log(response,'ksdjlafh')
            dispatch(signup(response))
        }).catch((error)=>{
           setError(error.inner[0].message)
        })
      }
  return (
    <div className="container">
      <div className="row bg-light row-container">
        <div className="signup-form">
        {error && <Alert key='danger' variant='danger'>
          {error}
        </Alert>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="exampleInputname1">Full Name</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputname1"
                aria-describedby="nameHelp"
                placeholder="Enter name"
                onChange={handleChange('name')}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                onChange={handleChange('email')}
              />
            </div>
           
           
            
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                onChange={handleChange('password')}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputConfirmPassword1">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputConfirmPassword1"
                placeholder="Confirm Password"
                onChange={handleChange('confirmPassword')}
              />
            </div>
          
           
            <button type="submit" className="btn btn-primary mt-2">
              Submit
            </button>
          </form>
          <p className='mt-3'>Already a user? Login</p>
        </div>
      </div>
    </div>
  );
}

export default SignupForm
