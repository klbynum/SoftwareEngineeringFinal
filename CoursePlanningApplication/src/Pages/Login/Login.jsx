import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { useAuth } from '../../AuthContext';
const LOGIN_URL = 'http://localhost:5001/auth';

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();

  const { setStudent } = useAuth();
  const navigate = useNavigate();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg('');

    try {
      const response = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user, password: pwd }),
      });

      const data = await response.json();

      if (response.ok) {
        setStudent(data.student); // Set context
        navigate('/'); // Redirect after login
      } else {
        setErrMsg(data.error || 'Login failed');
      }
    } catch (error) {
      setErrMsg('Server error');
    }

    setUser('');
    setPwd('');
  };

  return (
    <div className="login-page">
      <div className="wrapper">
        <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">
          {errMsg}
        </p>
        <h1>Sign in to Your Portal</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <FaUserAlt className="icon" />
            <input
              type="text"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
              placeholder="Username"
            />
          </div>
          <div className="input-box">
            <FaLock className="icon" />
            <input
              type="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              placeholder="Password"
            />
          </div>
          <div className="rememLabel">
            <a href="#">Forgot Password</a>
          </div>
          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
