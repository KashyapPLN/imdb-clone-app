import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './PersonDetails.css';
import { Col, Row } from 'react-bootstrap';

const BASE_URL = 'http://localhost:4000';
 // Base URL for images

function PersonDetails() {
    const { id } = useParams();
    const [person, setPerson] = useState(null);
    const [filmography, setFilmography] = useState([]);

    useEffect(() => {
        async function fetchPersonDetails() {
            try {
                const personResponse = await axios.get(`${BASE_URL}/person/${id}`, {
                  
                });

                setPerson(personResponse.data);
                setFilmography(personResponse.data.filmography);   

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
                                src={person.profile_path}
                                alt={`${person.name}'s profile`}
                                className="person-image"
                            />
                        )}
                    </Col>
                    <Col md={10} sm={12}>
                     <div className='person-biograpy'>
                        <p>{person.biography? person.biography : "Biography of the person not available."}</p>
                        </div>
                    </Col>
                </Row>
            </div>
            <h5>Filmography</h5>
            <ul>
                {filmography.length>0 ? filmography.slice(0, 10).map((movie,index) => (
                    <li key={index}>{movie}</li>
                )):<p className='mt-4'>Filmography not available</p>}
            </ul>
        </div>
    );
}

export default PersonDetails;
