import { Container } from 'react-bootstrap';
import './App.css';
import Navbar from './components/navbar/Navbar.js';
import MovieList from './components/MovieList.js';
import { Route, Routes } from 'react-router-dom';
import MovieDetails from './components/MovieDetails.js';
import PersonDetails from './components/PersonDetails.js';
import { useState } from 'react';

function App() {
  const [userName,setUserName]=useState('');
  return (
    <div className="App">
      <Container>
      <Navbar userName={userName} setUserName={setUserName}/>
      <Routes>
          <Route path="/" element={<MovieList />} />
         <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/person/:id" element={<PersonDetails />} /> 
        </Routes>
      </Container>
      
    </div>
  );
}

export default App;
