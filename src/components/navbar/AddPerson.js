import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import './Navbar.css';

export default function AddPerson({ handleAddPersonClose }) {
    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [filmography, setFilmography] = useState(['', '', '', '', '']);

    const handleFilmBlur = (index, event) => {
        const newFilmography = [...filmography];
        newFilmography[index] = event.target.value;
        setFilmography(newFilmography);
    };

    const handleSubmit = async () => {
        const personData = { name, id, filmography: filmography.filter(film => film) };
        try {
            const response = await axios.post('https://imdb-clone-backend-slf8.onrender.com/person', personData);
            console.log('Person added:', response.data);
            handleAddPersonClose();
        } catch (error) {
            console.error('Error adding person:', error);
        }
    };

    return (
                 <Form className='add-person'>
                <Form.Control
                    type='text'
                    placeholder='Person name'
                    onBlur={(e) => setName(e.target.value)}
                />
                <Form.Control
                    type='text'
                    placeholder='IMDb id'
                    onBlur={(e) => setId(Number(e.target.value))}
                />
                <Form.Label>Filmography :</Form.Label>
                {filmography.map((film, index) => (
                    <Form.Control
                        key={index}
                        type='text'
                        placeholder={`Film ${index + 1}(year)`}
                        onBlur={(e) => handleFilmBlur(index, e)}
                    />
                ))}
                <Button variant='outline-light' onClick={handleSubmit}>
                    Add person
                </Button>
            </Form>
        );
}

