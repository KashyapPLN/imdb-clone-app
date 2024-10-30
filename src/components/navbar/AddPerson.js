import React from 'react'
import { Form } from 'react-bootstrap'

export default function AddPerson() {
  return (
    <div>
         <Form.Control type='text' placeholder='Person name'/>
         <Form.Control type='text' placeholder='Imdb id'/>
         <Form.Label>Filmography :</Form.Label>
         <Form.Control type='text' placeholder='film 1'/>
        <Form.Control type='text' placeholder='film 2'/>
        <Form.Control type='text' placeholder='film 3'/>
        <Form.Control type='text' placeholder='film 4'/>
        <Form.Control type='text' placeholder='film 5'/>
    </div>
  )
}
