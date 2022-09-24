import React from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import SignupForm from '../../components/user/SignupForm/SignupForm'
import LoginForm from '../../components/user/LoginForm/LoginForm';

function Signup() {
  return (
    <div
      style={{ height: "600px" }}
      className="d-flex flex-direction-row justify-content-center align-items-center"
    >
      <div>
        <Tabs
          defaultActiveKey="signup"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="signup" title="Signup">
            <SignupForm />
          </Tab>
          <Tab eventKey="login" title="Login">
            <LoginForm />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default Signup
