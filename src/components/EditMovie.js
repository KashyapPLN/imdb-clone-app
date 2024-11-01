import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';

export default function EditMovie({ editId }) {
  const BASE_URL = 'https://imdb-clone-backend-slf8.onrender.com';
  const [movie, setMovie] = useState({
    title: '',
    id: '',
    release_date: '',
    poster_path: '',
    overview: ''
  });
  const [cast, setCast] = useState([]);
  const [producer, setProducer] = useState({ name: '', id: '' });
  const [director, setDirector] = useState({ name: '', id: '' });

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const movieResponse = await axios.get(`${BASE_URL}/movie/all/${editId}`);
        setMovie(movieResponse.data);

        const creditsResponse = await axios.get(`${BASE_URL}/movie-details/${editId}`);
        setCast(creditsResponse.data.cast);
        setProducer(creditsResponse.data.producer);
        setDirector(creditsResponse.data.director);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    }
    fetchMovieDetails();
  }, [editId]);

  const handleMovieChange = (e) => {
    const { name, value } = e.target;
    setMovie((prev) => ({ ...prev, [name]: value }));
  };

  const handleProducerChange = (e) => {
    const { name, value } = e.target;
    setProducer((prev) => ({ ...prev, [name]: value }));
  };

  const handleDirectorChange = (e) => {
    const { name, value } = e.target;
    setDirector((prev) => ({ ...prev, [name]: value }));
  };

  const handleCastChange = (index, field, value) => {
    const updatedCast = [...cast];
    updatedCast[index][field] = value;
    setCast(updatedCast);
  };

  const handleEditMovie = async () => {
    try {
      // Update movie details
      await axios.put(`${BASE_URL}/movie/all/${editId}`, movie);
      
      // Update movie credits (cast, producer, and director)
      await axios.put(`${BASE_URL}/movie-details/${editId}`, {
        cast,
        producer,
        director
      });

      alert('Movie details updated successfully!');
    } catch (error) {
      console.error('Error updating movie details:', error);
      alert('Failed to update movie details.');
    }
  };

  return (
    <div className='add-movie-div'>
      <Form.Control
        type='text'
        placeholder='Movie name'
        name='title'
        value={movie.title}
        onChange={handleMovieChange}
      />
      <Form.Control
        type='text'
        placeholder='Imdb id'
        readOnly
        name='id'
        value={movie.id}
      />
      <Form.Control
        type='date'
        placeholder='Release date'
        name='release_date'
        value={movie.release_date}
        onChange={handleMovieChange}
      />
      <Form.Control
        type='text'
        placeholder='Poster link'
        name='poster_path'
        value={movie.poster_path}
        onChange={handleMovieChange}
      />
      <Form.Control
        as='textarea'
        rows={3}
        placeholder='Movie synopsis'
        name='overview'
        value={movie.overview}
        onChange={handleMovieChange}
      />
      <Form.Group className='person-info'>
        <Form.Control
          type='text'
          placeholder='Producer name'
          name='name'
          value={producer.name}
          onChange={handleProducerChange}
        />
        <Form.Control
          type='text'
          placeholder='Imdb id'
          value={producer.id}
          readOnly
        />
      </Form.Group>
      <Form.Group className='person-info'>
        <Form.Control
          type='text'
          placeholder='Director name'
          name='name'
          value={director.name}
          onChange={handleDirectorChange}
        />
        <Form.Control
          type='text'
          placeholder='Imdb id'
          value={director.id}
          readOnly
        />
      </Form.Group>

      <Form.Label>Cast :</Form.Label>
      {cast.map((person, index) => (
        <Form.Group className='person-info' key={index}>
          <Form.Control
            type='text'
            placeholder='Cast'
            value={person.name}
            onChange={(e) => handleCastChange(index, 'name', e.target.value)}
          />
          <Form.Control
            type='text'
            placeholder='Imdb id'
            readOnly
            value={person.id}
          />
        </Form.Group>
      ))}

      <Button variant='outline-light' onClick={handleEditMovie}>
        Edit movie
      </Button>
    </div>
  );
}
