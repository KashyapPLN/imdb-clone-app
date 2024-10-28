import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './PersonDetails.css';
import { Col, Row } from 'react-bootstrap';

const API_KEY = 'c1c31aeb618a794f001e9daa6645d2d0';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'; // Base URL for images

function PersonDetails() {
    const { id } = useParams();
    const [person, setPerson] = useState(null);
    const [filmography, setFilmography] = useState([]);

    useEffect(() => {
        async function fetchPersonDetails() {
            try {
                const personResponse = await axios.get(`${BASE_URL}/person/${id}`, {
                    params: {
                        api_key: API_KEY,
                        language: 'en-US',
                    },
                });

                setPerson(personResponse.data);

                const movieCreditsResponse = await axios.get(`${BASE_URL}/person/${id}/movie_credits`, {
                    params: {
                        api_key: API_KEY,
                        language: 'en-US',
                    },
                });

                setFilmography(movieCreditsResponse.data.cast);
            } catch (error) {
                console.error('Error fetching person details:', error);
            }
        }

        fetchPersonDetails();
    }, [id]);

    if (!person) return <div>Loading...</div>;

    return (
        <div className="person-details">

            <h4 className='mb-3'>{person.name}</h4>
            <div className='person-profile'>
                <Row>
                    <Col md={2} sm={12}>
                        {person.profile_path && (
                            <img
                                src={`${IMAGE_BASE_URL}${person.profile_path}`}
                                alt={`${person.name}'s profile`}
                                className="person-image"
                            />
                        )}
                    </Col>
                    <Col md={10} sm={12}>
                     <div className='person-biograpy'>
                        <p>{person.biography}</p>
                        </div>
                    </Col>
                </Row>
            </div>
            <h5>Filmography</h5>
            <ul>
                {filmography.slice(0, 10).map(movie => (
                    <li key={movie.id}>{movie.title} ({movie.release_date?.split('-')[0]})</li>
                ))}
            </ul>
        </div>
    );
}

export default PersonDetails;
