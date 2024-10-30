import React from 'react'
import { Button, Form } from 'react-bootstrap'


export default function AddMovie() {
  return (
    <div className='add-movie-div'>
        <Form.Control type='text' placeholder='Movie name'/>
        <Form.Control type='text' placeholder='Imdb id'/>
        <Form.Control type='date' placeholder='release date'/>
        <Form.Control type='text' placeholder='Poster link'/>
        <Form.Group className='person-info'>
        <Form.Control type='text' placeholder='Producer name'/>
        <Form.Control type='text' placeholder='Imdb id'/>
        </Form.Group>
        <Form.Group className='person-info'>
        <Form.Control type='text' placeholder='Director name'/>
        <Form.Control type='text' placeholder='Imdb id'/>
        </Form.Group>
        <Form.Control as="textarea" rows={3} placeholder='Movie synopsis'/>

        <Form.Label>Cast :</Form.Label>
        <Form.Group className='person-info'>
        <Form.Control type='text' placeholder='cast 1'/> 
        <Form.Control type='text' placeholder='Imdb id'/>
        </Form.Group>
        <Form.Group className='person-info'>
        <Form.Control type='text' placeholder='cast 2'/>
        <Form.Control type='text' placeholder='Imdb id'/>
        </Form.Group>
        <Form.Group className='person-info'>
        <Form.Control type='text' placeholder='cast 3'/>
        <Form.Control type='text' placeholder='Imdb id'/>
        </Form.Group>
        <Form.Group className='person-info'>
        <Form.Control type='text' placeholder='cast 4'/>
        <Form.Control type='text' placeholder='Imdb id'/>
        </Form.Group>
        <Form.Group className='person-info'>
        <Form.Control type='text' placeholder='cast 5'/>
        <Form.Control type='text' placeholder='Imdb id'/>
        </Form.Group>    
  
       
    
        <Button variant='outline-light'>Add movie</Button>
            </div>
  )
}
