import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import { FaUserAlt, FaLock } from 'react-icons/fa';

const LOGIN_URL = 'http://localhost:5001/auth'; // Change this URL as per your backend setup

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [firstName, setFirstName] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: user,
          password: pwd,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setFirstName(data.student.firstName);
        setSuccess(true);
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
    <>
      {success ? (
        <section>
          <h1>You are logged in, {firstName}!</h1>
          <p>
            <Link to="/">Go to Home</Link>
          </p>
        </section>
      ) : (
        <div className="login-page">
          <div className="wrapper">
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
              {errMsg}
            </p>
            <h1>Sign in to (NSU Course Planning Application)</h1>
            <form onSubmit={handleSubmit}>
              <div className="input-box">
                <FaUserAlt className="icon" />
                <input
                  type="text"
                  id="username"
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
                  id="password"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
                  placeholder="Password"
                />
              </div>
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
