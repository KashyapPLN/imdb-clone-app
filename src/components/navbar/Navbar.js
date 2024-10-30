import React, { useEffect, useState } from 'react';
import './Navbar.css';
import imdbLogo from '../../assets/imdb_logo.png';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { IoSearch } from 'react-icons/io5';
import { Button, Modal } from 'react-bootstrap';
import Login from '../login/Login';
import Signup from '../login/Signup';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { MdOutlineAddBox } from 'react-icons/md';
import AddMovie from './AddMovie';

export default function NavbarComponent({userName,setUserName}) {
  const [show, setShow] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [login, setLogin] = useState(true);
  const handleShow = () => { setShow(true); setLogin(true) };
  const handleClose = () => setShow(false);
  const handleAddShow = () => setShowAdd(true);
  const handleAddClose = () => setShowAdd(false);
  const navigate = useNavigate();

  useEffect(()=>{
    if(localStorage.getItem('token')){
      const decodedToken = jwtDecode(localStorage.getItem('token'));
      setUserName(decodedToken.name);
    }
  },[])

  function logout() {
    localStorage.clear();
    setUserName('')
    navigate('/');
  }
  return (
    <div className='custom-navbar'>
      <Navbar collapseOnSelect expand="lg" bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/"><img className='imdb-icon' src={imdbLogo} /></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <div className='search-div'>
                <span><IoSearch /></span>
                <input type='search' placeholder="Search" />
              </div>

            </Nav>
            <Nav>
            {localStorage.getItem('token') && <Button variant='outline-light' className='me-4' style={{fontWeight:700}} onClick={handleAddShow}>Add movie</Button>}

              {!localStorage.getItem('token') ? <Button variant='text' style={{ fontWeight: 700, color: 'white', cursor: 'pointer' }} onClick={handleShow}>Sign In</Button> :
                <NavDropdown title={<span style={{ fontWeight: 700, color: 'white' }}>{userName}</span>} id="collapsible-nav-dropdown">
                  <NavDropdown.Item onClick={logout}>logout</NavDropdown.Item>
                </NavDropdown>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Modal className='login-modal' show={show} onHide={handleClose} centered bg="dark" data-bs-theme="dark">
        <Modal.Header style={{ borderBottom: 'none' }} closeButton>
          <Modal.Title style={{ color: 'white' }}>{login ? 'Login' : 'Create Account'}</Modal.Title>
        </Modal.Header>
        {login ? <Login setLogin={setLogin} handleClose={handleClose} userName={userName} setUserName={setUserName}/>
          : <Signup setLogin={setLogin} handleClose={handleClose} />
        }
      </Modal>
      <Modal show={showAdd} onHide={handleAddClose}  centered bg="dark" data-bs-theme="dark">
        <Modal.Header style={{borderBottom:'none'}} closeButton>
          <Modal.Title style={{color:'white'}}>Add Movie</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{color:'white'}}>
          <AddMovie/>
        </Modal.Body>
        </Modal>
    </div>
  )
}
