import React from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import LoginForm from '../../components/user/LoginForm/LoginForm'
import SignupForm from '../../components/user/SignupForm/SignupForm'

function Login() {
  return (
    <div>
       <div
      style={{ height: "600px" }}
      className="d-flex flex-direction-row justify-content-center align-items-center"
    >
      <div>
        <Tabs
          defaultActiveKey="Login"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="Login" title="Login">
          <LoginForm />
          
          </Tab>
          <Tab eventKey="signup" title="Signup">
          <SignupForm />
          </Tab>
        </Tabs>
      </div>
    </div>
      
    </div>
  )
}

export default Login
