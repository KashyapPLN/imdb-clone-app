import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './MovieDetails.css';
import { Col, Row } from 'react-bootstrap';
import { FaPlay } from 'react-icons/fa';

const API_KEY = 'c1c31aeb618a794f001e9daa6645d2d0';
const BASE_URL = 'https://api.themoviedb.org/3';

function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState([]);
    const [producer, setProducer] = useState(null);
    const [director, setDirector] = useState(null);
    const [trailerUrl, setTrailerUrl] = useState(null);

    useEffect(() => {
        async function fetchMovieDetails() {
            try {
                const movieResponse = await axios.get(`${BASE_URL}/movie/${id}`, {
                    params: {
                        api_key: API_KEY,
                        language: 'en-US',
                    },
                });

                setMovie(movieResponse.data);

                const creditsResponse = await axios.get(`${BASE_URL}/movie/${id}/credits`, {
                    params: {
                        api_key: API_KEY,
                        language: 'en-US',
                    },
                });

                setCast(creditsResponse.data.cast);

                const producerInfo = creditsResponse.data.crew.find(member => member.job === 'Producer');
                setProducer(producerInfo);

                const directorInfo = creditsResponse.data.crew.find(member => member.job === 'Director');
                setDirector(directorInfo);

                // Fetch the trailer data
                const videosResponse = await axios.get(`${BASE_URL}/movie/${id}/videos`, {
                    params: {
                        api_key: API_KEY,
                        language: 'en-US',
                    },
                });

                // Find the first trailer
                const trailer = videosResponse.data.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
                if (trailer) {
                    setTrailerUrl(`https://www.youtube.com/watch?v=${trailer.key}`);
                }
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        }

        fetchMovieDetails();
    }, [id]);

    if (!movie) return <div>Loading...</div>;

    return (
        <div className="movie-details">
            <div className='movie-info mb-4'>
                <Row>
                    <Col md={4} sm={12}>
                        <img
                            src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                            alt={movie.title}
                        />
                    </Col>
                    <Col md={8} sm={12}>
                        <div className='movie-info-overview '>
                            <h4>{movie.title}</h4>
                            <p>Release Year : {movie.release_date.split('-')[0]}</p>
                            <p>{movie.overview}</p>
                            {trailerUrl && (
                                <button className='movie-details-trailer-button' onClick={() => window.open(trailerUrl, '_blank', 'noopener noreferrer')}>
                                    <FaPlay />
                                    Watch Trailer
                                </button>
                            )}
                        </div>
                    </Col>
                </Row>
            </div>
            <p>
                Director : {director ? (
                    <Link className='cast-crew' to={`/person/${director.id}`}>{director.name}</Link>
                ) : 'N/A'}
            </p>
            <p>
                Producer : {producer ? (
                    <Link className='cast-crew' to={`/person/${producer.id}`}>{producer.name}</Link>
                ) : 'N/A'}
            </p>
            <h5>Cast</h5>
            <ul>
                {cast.slice(0, 5).map(actor => (
                    <li key={actor.id}>
                        <Link className='cast-crew' to={`/person/${actor.id}`}>{actor.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MovieDetails;
