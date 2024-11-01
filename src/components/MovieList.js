import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Carousel, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './MovieList.css'; // Import your custom CSS file
import { FaPlay, FaStar } from 'react-icons/fa';
import { PiLineVerticalBold } from 'react-icons/pi';
import { MdEdit, MdOutlineNavigateNext } from 'react-icons/md';
import EditMovie from './EditMovie';

const BASE_URL = 'https://imdb-clone-backend-slf8.onrender.com';

function MovieList({userName}) {
    const [topPicks, setTopPicks] = useState([]);
    const [top10ThisWeek, setTop10ThisWeek] = useState([]);
    const [fanFavourites, setFanFavourites] = useState([]);
    const [editId,setEditId]=useState(null);
    const [show, setShow] = useState(false);
    const handleShow = (id) => {setEditId(id);setShow(true);} 
    const handleClose = () =>{setShow(false);setEditId(null);} 

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
                                        <div className='rating-edit-div'>
                                            <div className='movie-rating'>
                                                <FaStar className='star'/>
                                                <span>{Number(movie.vote_average).toFixed(1)}</span>
                                            </div>
                                            {userName!==''&&<Button style={{color:'white'}} variant='text' onClick={()=>handleShow(movie.id)}><MdEdit /></Button>}
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
                                                src={movie.poster_path}
                                                alt={movie.title}
                                            />
                                        </Link>
                                        <div className='movie-card-text'>
                                            <div className='rating-edit-div'>
                                            <div className='movie-rating'>
                                                <FaStar className='star'/>
                                                <span>{Number(movie.vote_average).toFixed(1)}</span>
                                            </div>
                                            {userName!==''&&<Button style={{color:'white'}} variant='text' onClick={()=>{handleShow(movie.id)}}><MdEdit /></Button>}
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
                                               src={movie.poster_path}
                                                alt={movie.title}
                                            />
                                        </Link>
                                        <div className='movie-card-text'>
                                        <div className='rating-edit-div'>
                                            <div className='movie-rating'>
                                                <FaStar className='star'/>
                                                <span>{Number(movie.vote_average).toFixed(1)}</span>
                                            </div>
                                            {userName!==''&&<Button style={{color:'white'}} variant='text' onClick={()=>{handleShow()}}><MdEdit /></Button>}
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
            <Modal show={show} onHide={handleClose} centered bg="dark" data-bs-theme="dark">
        <Modal.Header style={{ borderBottom: 'none' }} closeButton>
          <Modal.Title style={{ color: 'white' }}>Edit Movie</Modal.Title></Modal.Header>
        <Modal.Body style={{ color: 'white' }}>
          <EditMovie editId={editId}  handleClose={handleClose}/>
        </Modal.Body>
      </Modal>
        </div>
    );
}

export default MovieList;
