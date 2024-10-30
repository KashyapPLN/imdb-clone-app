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
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { MdClose, MdOutlineAddBox } from 'react-icons/md';
import AddMovie from './AddMovie';
import AddPerson from './AddPerson';

export default function NavbarComponent({ userName, setUserName, searchResults, setSearchResults }) {
  const [show, setShow] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showAddPerson, setShowAddPerson] = useState(false);
  const [login, setLogin] = useState(true);
  const handleShow = () => { setShow(true); setLogin(true) };
  const handleClose = () => setShow(false);
  const handleAddShow = () => setShowAdd(true);
  const handleAddClose = () => setShowAdd(false);
  const handleAddPersonShow = () => setShowAddPerson(true);
  const handleAddPersonClose = () => setShowAddPerson(false);
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const clearSearch = () => {
    setSearchText('');
    setSearchResults([]);
  };
async function handleSearch(searchTerm){
  if (searchTerm.trim() !== '') {
    const response = await fetch(`https://imdb-clone-backend-slf8.onrender.com/search?q=${searchTerm}`);
    const data = await response.json();
    console.log(data.data);
    
    setSearchResults(data.data);
    // if (data.data.length > 0) {
    //   navigate('/search');
    // }
  } else {
    setSearchResults([]);
  }
}
  useEffect(() => {
    if (localStorage.getItem('token')) {
      const decodedToken = jwtDecode(localStorage.getItem('token'));
      setUserName(decodedToken.name);
    }
  }, [])

  function logout() {
    localStorage.clear();
    setUserName('')
    navigate('/');
  }
  return (
    <div className='custom-navbar'>
      <Navbar collapseOnSelect expand="lg" bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">
            {/* <img className='imdb-icon' src={imdbLogo} /> */}
            <span style={{ color: "gold", fontWeight: 800 }}>Imdb-Clone</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
                    <div className='search-div'>
                <span><IoSearch /></span>
                <input type='text' placeholder="Search" value={searchText}
                  onChange={(e) => {setSearchText(e.target.value);handleSearch(e.target.value);}} />
                  {searchText && (
                  <button className="clear-btn" onClick={clearSearch}>
                    <MdClose />
                  </button>
                  
                )}           
              </div>
        
            </Nav>
            <Nav>
              {localStorage.getItem('token') && <Button variant='outline-light' className='me-4' style={{ fontWeight: 700 }} onClick={handleAddShow}>Add movie</Button>}
              {localStorage.getItem('token') && <Button variant='outline-light' className='me-4' style={{ fontWeight: 700 }} onClick={handleAddPersonShow}>Add person</Button>}
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
        {login ? <Login setLogin={setLogin} handleClose={handleClose} userName={userName} setUserName={setUserName} />
          : <Signup setLogin={setLogin} handleClose={handleClose} />
        }
      </Modal>
      <Modal show={showAdd} onHide={handleAddClose} centered bg="dark" data-bs-theme="dark">
        <Modal.Header style={{ borderBottom: 'none' }} closeButton>
          <Modal.Title style={{ color: 'white' }}>Add Movie</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ color: 'white' }}>
          <AddMovie />
        </Modal.Body>
      </Modal>
      <Modal show={showAddPerson} onHide={handleAddPersonClose} centered bg="dark" data-bs-theme="dark">
        <Modal.Header style={{ borderBottom: 'none' }} closeButton>
          <Modal.Title style={{ color: 'white' }}>Add Person</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ color: 'white' }}>
<AddPerson handleAddPersonClose={handleAddPersonClose}/>
        </Modal.Body>
      </Modal>
      {searchResults && searchResults.length > 0 && (
        <div className="search-results-container" >
          {searchResults.map((result) => (
            <Link key={result.id} to={`/${result.title ?'movie':'person' }/${result.id}`} onClick={()=>{setTimeout(()=>{setSearchResults('');},1)}}style={{ textDecoration: 'none', color: 'white' }}>
              <div className="search-result-item" style={{ padding: '10px', borderBottom: '1px solid #333' }}>
              <img src={result.profile_path||result.poster_path} alt={result.name || result.title} />
                <strong>{result.title || result.name}</strong>
                {/* <p>{result.type === 'movie' ? result.overview : result.biography}</p> */}
              </div>
            </Link>
          ))}
             </div>
      )}
    </div>
  )
}
