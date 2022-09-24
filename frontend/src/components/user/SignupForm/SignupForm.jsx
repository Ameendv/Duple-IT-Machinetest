import React,{useState} from 'react'
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
      

      const handleChange=(prop)=>(event)=>{
        setError()
        setValues({...values,[prop]:event.target.value})
        console.log(values)
      }

      const handleSubmit=async(e)=>{
        e.preventDefault()
        await signupSchema.validate(values,{abortEarly:false}).then((response)=>{
            console.log(response)
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
        </div>
      </div>
    </div>
  );
}

export default SignupForm
