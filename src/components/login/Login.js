import axios from 'axios';
import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import './Login.css';
import {jwtDecode} from 'jwt-decode';

export default function Login({setLogin,handleClose,setUserName}) {

    const apiUrl = process.env.REACT_APP_API_URL;
    const [email,setEmail]= useState('');
    const [password,setPassword]= useState('');
    
const handleLogin = ()=>{
    if(email!==''&& password!==''){
        const request = {
            emailId:email,
            password
        }
        axios.post(`${apiUrl}/user/login`,request,{headers:{
            'Content-Type': 'application/json'},}
        ).then(res=>{
          console.log(jwtDecode(res.data.token))
          const decodedToken = jwtDecode(res.data.token)
          localStorage.setItem('token',res.data.token);
          setUserName(decodedToken.name);
          handleClose();
    })
    }
   
}
  return (
    <div><Modal.Body className='login-modal-body'>
    <Form.Control type='email' placeholder='Email' onBlur={(e)=>setEmail(e.target.value)}/>
    <Form.Control type='password' placeholder='Password' onBlur={(e)=>setPassword(e.target.value)}/> 
    <p className='login-modal-body-text'>Don't have an account? <Button variant='link' style={{color:'white'}} onClick={(e)=>setLogin(false)}>Create Account</Button></p>  
    <Button variant='outline-light' className='mb-3' onClick={handleLogin}>Login</Button>
  </Modal.Body>

   </div>
  )
}