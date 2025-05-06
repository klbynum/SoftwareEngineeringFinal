import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { FaUserAlt, FaLock } from 'react-icons/fa';

const LOGIN_URL = 'http://localhost:5001/auth'; // Change this URL as per your backend setup
const STUDENT_DATA_URL = 'http://localhost:5001/student'; // URL to fetch student data

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [firstName, setFirstName] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  // Function to fetch student data based on username
  const fetchStudentData = async (username) => {
    try {
      const response = await fetch(`${STUDENT_DATA_URL}/${username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStudentData(data);
        
        // Store student data in localStorage or context for use across the app
        localStorage.setItem('studentData', JSON.stringify(data));
        
        return data;
      } else {
        console.error('Failed to fetch student data');
        return null;
      }
    } catch (error) {
      console.error('Error fetching student data:', error);
      return null;
    }
  };

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
        
        // Save authentication token if your backend provides one
        if (data.token) {
          localStorage.setItem('authToken', data.token);
        }
        
        // Fetch complete student data after successful login
        const studentInfo = await fetchStudentData(user);
        
        if (studentInfo) {
          setSuccess(true);
          // Redirect to dashboard or home page after short delay
          setTimeout(() => {
            navigate('/dashboard');
          }, 1500);
        }
      } else {
        setErrMsg(data.error || 'Login failed');
      }
    } catch (error) {
      setErrMsg('Server error');
    }

    setPwd('');
  };

  return (
    <>
      {success ? (
        <section>
          <h1>You are logged in, {firstName}!</h1>
          <p>Loading your data...</p>
        </section>
      ) : (
        <div className="login-page">
          <div className="wrapper">
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
              {errMsg}
            </p>
            <h1>Sign in to NSU Course Planning Application</h1>
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