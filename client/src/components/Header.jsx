import React, {useContext, useEffect} from 'react';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

import {Context} from '../index'

import {Routes, Route, Link} from 'react-router-dom';

import {observer} from 'mobx-react-lite';

//pages 
import LegendForm from './Pages/LegendForm';
import LoginForm from './Pages/LoginForm';
import RegistrationForm from './Pages/RegistrationForm';
import ErrorPage from './Pages/ErrorPage';

function Header() {

  const {store} = useContext(Context);

  const linkStyle = {textDecoration:'none',color:'black', marginBottom:'10px'};
  const expand = false;
  let link = <Link to="/registration" style={linkStyle}>Register/Login</Link>;
  let logout = <></>;


  useEffect(() => {
    if(localStorage.getItem('token')){
      store.checkAuth();
    }
  },[]);

  const logoutHandle = () =>{
    store.logout();
    logout = <></>;
  }

  if(store.isAuth){
    link = <Link to="/user" style={linkStyle}>My profile</Link>;
    logout = <Nav.Link onClick={logoutHandle}>Logout</Nav.Link>;
  }



  return (
    <>
        <Navbar expand={expand} className="mb-3" style={{background:'rgb(142,195,142)', margin:0, boxShadow:'.5px .5px .5px black'}}>
          <Container fluid>
            <Navbar.Brand style={{color:'green', font:'DejaVu Sans Mono '}} href="#">HoodShmoukers<div style={{display:'inline', color:'dark'}}>Chat</div></Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
              style={{background:'rgb(142,195,142)'}}
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  HoodShmoukersChat
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">

                  {link}
                  <Link  to="/legends" style={linkStyle}>Legends</Link>



                  <NavDropdown
                    title="Dropdown"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      Something else here
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                  
                </Form>
                
                {logout}
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
        <Routes>
          <Route path='/registration' element={<RegistrationForm/>}/>
          <Route path="/legends" element={<LegendForm/>}/>
          <Route path="/login" element={<LoginForm/>}/>
          <Route path="*" element={<ErrorPage/>}/>
        </Routes>
    </>
  );
}

export default observer(Header);