import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './MovieList.css'; // Import your custom CSS file
import { FaPlay, FaStar } from 'react-icons/fa';
import { PiLineVerticalBold } from 'react-icons/pi';
import { MdOutlineNavigateNext } from 'react-icons/md';

const BASE_URL = 'http://localhost:4000';

function MovieList() {
    const [topPicks, setTopPicks] = useState([]);
    const [top10ThisWeek, setTop10ThisWeek] = useState([]);
    const [fanFavourites, setFanFavourites] = useState([]);

    useEffect(() => {
        async function fetchMovies() {
            try {
                // Fetch Top Picks
                const topPicksResponse = await axios.get(`${BASE_URL}/movie/popular`);
                setTopPicks(topPicksResponse.data);

                // Fetch Top 10 on IMDb This Week
                const top10Response = await axios.get(`${BASE_URL}/movie/topRated`);
                setTop10ThisWeek(top10Response.data);

                // Fetch Fan Favourites
                const fanFavouritesResponse = await axios.get(`${BASE_URL}/movie/trending`);
                setFanFavourites(fanFavouritesResponse.data);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        }

        fetchMovies();
    }, []);

    // Function to chunk the array into groups of 6 and ensure last slide is filled
    const chunkArray = (array, chunkSize) => {
        const result = [];
        let currentChunk = [];

        array.forEach((item, index) => {
            currentChunk.push(item);
            if (currentChunk.length === chunkSize) {
                result.push(currentChunk);
                currentChunk = [];
            }
        });

        // Fill the last chunk with previous cards if it has fewer than chunkSize items
        if (currentChunk.length > 0) {
            const lastChunk = result[result.length - 1] || [];
            result[result.length - 1] = [...lastChunk, ...currentChunk];
        }

        return result;
    };

    const topPicksChunks = chunkArray(topPicks, 5);
    const top10Chunks = chunkArray(top10ThisWeek, 5);
    const fanFavouritesChunks = chunkArray(fanFavourites, 5);

    return (
        <div className="movie-list">
            <div className='top-picks'>
                <h5><PiLineVerticalBold className='heading-symbols'/>Top Picks  <MdOutlineNavigateNext className='heading-symbols'/></h5>
                <Carousel controls={true} indicators={false}>
                    {topPicksChunks.map((chunk, index) => (
                        <Carousel.Item key={index}>
                            <div className="movie-cards d-flex justify-content-between">
                                {chunk.map((movie) => (
                                    <div key={movie.id} className="movie-card">
                                        <Link className='movie-link' to={`/movie/${movie.id}`}>
                                            <img
                                                src={movie.poster_path}
                                                alt={movie.title}
                                            />
                                        </Link>
                                        <div className='movie-card-text'>
                                            <div className='movie-rating'>
                                                <FaStar className='star'/>
                                                <span>{Number(movie.vote_average).toFixed(1)}</span>
                                            </div>
                                            <Link className='movie-link' to={`/movie/${movie.id}`}><p className='movie-name'>{movie.title}</p></Link>                                           
                                            {movie.trailerUrl && (
                                               <button className='trailer-button' onClick={() => window.open(movie.trailerUrl, '_blank', 'noopener noreferrer')}>
                                               <FaPlay />
                                              <span>Watch Trailer</span>
                                           </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>
            <div className='top-ten'>
                <h5><PiLineVerticalBold className='heading-symbols'/>Top 10 on IMDb This Week  <MdOutlineNavigateNext className='heading-symbols'/></h5>
                <Carousel controls={true} indicators={false}>
                    {top10Chunks.map((chunk, index) => (
                        <Carousel.Item key={index}>
                            <div className="movie-cards d-flex justify-content-between">
                                {chunk.map((movie) => (
                                    <div key={movie.id} className="movie-card">
                                        <Link className='movie-link' to={`/movie/${movie.id}`}>
                                            <img
                                                src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                                                alt={movie.title}
                                            />
                                        </Link>
                                        <div className='movie-card-text'>
                                            <div className='movie-rating'>
                                                <FaStar className='star'/>
                                                <span>{Number(movie.vote_average).toFixed(1)}</span>
                                            </div>
                                            <Link className='movie-link' to={`/movie/${movie.id}`}><p className='movie-name'>{movie.title}</p></Link>                                            
                                            {movie.trailerUrl && (
                                              <button className='trailer-button' onClick={() => window.open(movie.trailerUrl, '_blank', 'noopener noreferrer')}>
                                              <FaPlay />
                                              Watch Trailer
                                          </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>
            <div className='favourites'>
                <h5><PiLineVerticalBold className='heading-symbols'/>Fan Favourites  <MdOutlineNavigateNext className='heading-symbols'/></h5>
                <Carousel indicators={false} controls={true}>
                    {fanFavouritesChunks.map((chunk, index) => (
                        <Carousel.Item key={index}>
                            <div className="movie-cards d-flex justify-content-between">
                                {chunk.map((movie) => (
                                    <div key={movie.id} className="movie-card">
                                        <Link className='movie-link' to={`/movie/${movie.id}`}>
                                            <img
                                                src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                                                alt={movie.title}
                                            />
                                        </Link>
                                        <div className='movie-card-text'>
                                            <div className='movie-rating'>
                                                <FaStar className='star'/>
                                                <span>{Number(movie.vote_average).toFixed(1)}</span>
                                            </div>
                                            <Link className='movie-link' to={`/movie/${movie.id}`}><p className='movie-name'>{movie.title}</p></Link>                                           
                                            {movie.trailerUrl && (
                                             <button className='trailer-button' onClick={() => window.open(movie.trailerUrl, '_blank', 'noopener noreferrer')}>
                                             <FaPlay />
                                             Watch Trailer
                                         </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>
        </div>
    );
}

export default MovieList;
