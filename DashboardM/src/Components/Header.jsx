import React from 'react'
import { Button, Container, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from './AuthContext';

const Header = () => {
  const { isLoggedIn, logout } = useAuth();
  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand className='LogoName' as={Link} to="/">

         E-Commerce
        </Navbar.Brand>
        <div className='d-flex'>
           <Button className='me-3' variant="primary" as={Link} to="/" >Home </Button>
            <Button className='me-3' variant="primary" as={Link} to="/about" >About Us </Button>
              <Button className='me-3' variant="primary" as={Link} to="/contact" >Contact Us </Button>

       
        
        {
          isLoggedIn ? <div>
           
             <Button className='me-3' variant="primary" as={Link} to="/dashboard">Product List </Button>
             {/* <Button className='me-3' variant="primary" as={Link} to="/create"> Add Employee </Button> */}
            
             <Button variant="danger" onClick={logout}> Logout </Button>
            <Button className='ms-3' as={Link} to="/cart">
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart-check" viewBox="0 0 16 16">
    <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z"/>
    <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
  </svg>
</Button>
             </div>
              : 
              <Button variant="success" as={Link} to="/login"> Login </Button>
        }
         </div>

      </Container>
    </Navbar>
  )
}

export default Header