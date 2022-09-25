import {useEffect,useState} from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './navbar.css'

function NavbarHome() {

  const [user,setUser]=useState()

  useEffect(()=>{
    const logged=localStorage.getItem('user')
   setUser(logged)
  })
 
  
  return (
    <Navbar style={{backgroundColor:'#303030'}} expand="lg">
      <Container fluid>
        <Navbar.Brand  style={{ color:'#E50914', fontFamily: 'Secular One,sans-serif'}} href="#">VID TUBE</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1" className='text-light'>Home</Nav.Link>
            <Nav.Link href="#action2" className='text-light'>Link</Nav.Link>
            
            <Nav.Link href="#" className='text-light'>
              Link
            </Nav.Link>
          </Nav>{user?( <NavDropdown title={user} id="navbarScrollingDropdown" className='text-light'>

              <NavDropdown.Item href="#action4" >
                Logout
              </NavDropdown.Item>
             
            </NavDropdown>): <NavDropdown title="Login" id="navbarScrollingDropdown" className='text-light'>
              <NavDropdown.Item href="#action3" >Login</NavDropdown.Item>
              <NavDropdown.Item href="#action4" >
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