import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

export default function AddMovie({handleAddClose}) {
  const BASE_URL = 'https://imdb-clone-backend-slf8.onrender.com';
  
  const [movie, setMovie] = useState({
    title: '',
    id: '',
    release_date: '',
    poster_path: '',
    overview: ''
  });
  const [producer, setProducer] = useState({ name: '', id: '' });
  const [director, setDirector] = useState({ name: '', id: '' });
  const [cast, setCast] = useState([
    { name: '', id: '' },
    { name: '', id: '' },
    { name: '', id: '' },
    { name: '', id: '' },
    { name: '', id: '' },
  ]);

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

  const handleAddMovie = async () => {
    try {
 
      await axios.post(`${BASE_URL}/movie`, movie);
    
      await axios.post(`${BASE_URL}/movie-details`, {
        cast,
        producer,
        director
      });
      handleAddClose();
      alert('Movie added successfully!');

      setMovie({
        title: '',
        id: '',
        release_date: '',
        poster_path: '',
        overview: ''
      });
      setProducer({ name: '', id: '' });
      setDirector({ name: '', id: '' });
      setCast([
        { name: '', id: '' },
        { name: '', id: '' },
        { name: '', id: '' },
        { name: '', id: '' },
        { name: '', id: '' },
      ]);
    } catch (error) {
      console.error('Error adding movie:', error);
      handleAddClose();
      alert('Failed to add movie.');
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
        name='id'
        value={movie.id}
        onChange={handleMovieChange}
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
        as="textarea"
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
          onChange={(e) => handleProducerChange({ target: { name: 'id', value: e.target.value } })}
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
          onChange={(e) => handleDirectorChange({ target: { name: 'id', value: e.target.value } })}
        />
      </Form.Group>

      <Form.Label>Cast :</Form.Label>
      {cast.map((person, index) => (
        <Form.Group className='person-info' key={index}>
          <Form.Control
            type='text'
            placeholder={`Cast ${index + 1}`}
            value={person.name}
            onChange={(e) => handleCastChange(index, 'name', e.target.value)}
          />
          <Form.Control
            type='text'
            placeholder='Imdb id'
            value={person.id}
            onChange={(e) => handleCastChange(index, 'id', e.target.value)}
          />
        </Form.Group>
      ))}

      <Button variant='outline-light' onClick={handleAddMovie}>
        Add movie
      </Button>
    </div>
  );
}
