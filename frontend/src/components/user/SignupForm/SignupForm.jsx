import React from 'react'
import './SignupForm.css'

function SignupForm() {
  return (
    <div className="container">
      <div className="row bg-light row-container">
        <div className="signup-form">
          <form>
            <div className="form-group">
              <label htmlFor="exampleInputname1">Full Name</label>
              <input
                type="text"
                className="form-control"
                id="exampleInputname1"
                aria-describedby="nameHelp"
                placeholder="Enter name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
            </div>
           
           
            
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputConfirmPassword1">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputConfirmPassword1"
                placeholder="Confirm Password"
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
