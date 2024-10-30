import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import './Login.css';

export default function Signup({setLogin,handleClose}) {
    const apiUrl = 'https://imdb-clone-backend-slf8.onrender.com';
    const [email,setEmail]= useState('');
    const [password,setPassword]= useState('');
    const [name,setName]=useState('');
     const handleSignUp = () => {
        if(email!==''&& password!==''&& name!==''){
            const request = {
                emailId:email,
                password,
                name,
            }
            axios.post(`${apiUrl}/user/signup`,request,{headers:{
                'Content-Type': 'application/json'}}
            ).then(res=>{console.log(res);handleClose();})
        }      
    }
  return (
    <div><Modal.Body className='login-modal-body'>
    <Form.Control type='text' placeholder='Name' onBlur={(e)=>setName(e.target.value)}/>
      <Form.Control type='email' placeholder='Email' onBlur={(e)=>setEmail(e.target.value)}/>
      <Form.Control type='password' placeholder='Password'onBlur={(e)=>setPassword(e.target.value)}/> 
      <p className='login-modal-body-text'>Have an account? <Button variant='link' style={{color:'white'}} onClick={(e)=>setLogin(true)}>Login</Button></p>    
      <Button variant='outline-light' className='mb-3' onClick={handleSignUp}>Create Account</Button>
    </Modal.Body>
    </div>
   
  )
}
