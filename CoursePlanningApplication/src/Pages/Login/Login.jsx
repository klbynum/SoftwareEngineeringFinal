import React from 'react'
import { Link } from 'react-router-dom';
import './Login.css';
import '../Home/Home.css';
import { FaUserAlt, FaLock } from "react-icons/fa";
import {useRef, useState, useEffect, useContext } from 'react';
import { data } from 'react-router-dom';
const LOGIN_URL = '/auth';

const Login = () => {
  //const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false); 

  useEffect (() => {
    userRef.current?.focus();
  }, [])

  useEffect (() => {
    setErrMsg('');
  }, [user, pwd])

  const handleSubmit =async (e) => {
    e.preventDefault();
    setUser('');
    setPwd('');
    setSuccess(true);
  }

  return (
    <>
      {success ? (
        <section>
          <h1>You are logged in!</h1>
          <br />
          <p>
            <Link to="/" >Go to Home</Link>
          </p>
        </section>
      ) : (
    <div className="login-page">
      <div className="wrapper">
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}aria-live="assertive">
        {errMsg} </p>
        <h1>Sign in to (NSU Course Planning Application)</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <FaUserAlt className="icon" />
            <input 
              type="text" 
              id="username"
              ref ={userRef} 
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
              placeholder='Username'
            />
          </div>
          <div className="input-box">
            <FaLock className="icon" />
            <input 
              type="password" 
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              placeholder='Password'
            />
          </div>
          <div className="rememLabel">
            <a hfref="#">Forgot Password</a>
          </div>
          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
      )}
      </>
  );
  
};

export default Login