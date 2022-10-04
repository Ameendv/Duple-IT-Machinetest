import React,{useEffect,useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {reset} from '../../../redux/authSliceLogin'
import './navbar.css'

function NavbarHome() {

  const navigate=useNavigate()
  const dispatch=useDispatch()

  const [user,setUser]=useState()

  const handleAddVideo=()=>{
    navigate('/add-video')
  }

  const handleLogout = ()=>{
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    setUser('')
    dispatch(reset())
    navigate('/')
  }

  useEffect(()=>{
    const logged=localStorage.getItem('user')
   setUser(logged)
  },[user])
 
  
  return (
    <Navbar style={{backgroundColor:'#303030'}} expand="lg">
      <Container fluid>
        <Navbar.Brand  style={{ color:'#E50914', fontFamily: 'Secular One,sans-serif'}} >VID TUBE</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link  className='text-light' onClick={()=>{navigate('/')}} >Home</Nav.Link>
            <Nav.Link  className='text-light' onClick={handleAddVideo}>Add videos</Nav.Link>
            
            <Nav.Link  className='text-light'>
              Link
            </Nav.Link>
          </Nav>{user?( <NavDropdown title={JSON.parse(user)} id="navbarScrollingDropdown" className='text-light'>

              <NavDropdown.Item onClick={handleLogout} >
                Logout
              </NavDropdown.Item>
             
            </NavDropdown>): <NavDropdown title="Login" id="navbarScrollingDropdown" className='text-light'>
              <NavDropdown.Item onClick={()=>navigate('/login')}>Login</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>navigate('/signup')}> 
                Signup
              </NavDropdown.Item>
             
            </NavDropdown>}
         
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success" className='text-light'>Search</Button>
          </Form>
         
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarHome;