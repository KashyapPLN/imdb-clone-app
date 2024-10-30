import { Container } from 'react-bootstrap';
import './App.css';
import Navbar from './components/navbar/Navbar.js';
import MovieList from './components/MovieList.js';
import { Route, Routes } from 'react-router-dom';
import MovieDetails from './components/MovieDetails.js';
import PersonDetails from './components/PersonDetails.js';
import { useState } from 'react';
import SearchResults from './SearchResults.js';

function App() {
  const [userName,setUserName]=useState('');
  const [searchResults, setSearchResults] = useState([]);
  return (
    <div className="App">
      <Container>
      <Navbar userName={userName} setUserName={setUserName} searchResults={searchResults} setSearchResults={setSearchResults}/>
      <Routes>
          <Route path="/" element={<MovieList />} />
         <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/person/:id" element={<PersonDetails />} /> 
          {/* <Route path="/search" element={<SearchResults searchResults={searchResults} />} /> */}
        </Routes>
      </Container>
      
    </div>
  );
}

export default App;
