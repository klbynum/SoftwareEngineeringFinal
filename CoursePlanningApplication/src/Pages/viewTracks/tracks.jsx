import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '/Users/kemonbynum/Desktop/myPlayground/SoftwareEngineeringFinal/CoursePlanningApplication/src/AuthContext.jsx'; // Importing the AuthContext
//import './trackSearch.css';

function TrackSearch() {
  const { student } = useAuth(); // Accessing student data from context
  const [track, setTrack] = useState(null);

  // Fetch Cybersecurity Track Data once the component mounts
  useEffect(() => {
    if (student && student.StudentID) {
      fetchCybersecurityTrack();
    }
  }, [student]);

  const fetchCybersecurityTrack = () => {
    fetch('http://localhost:5001/cybersecurityTrack') // Always fetch the Cybersecurity track
      .then(res => res.json())
      .then(data => {
        if (data && Array.isArray(data.CybersecurityTrack)) {
          setTrack(data.CybersecurityTrack); // Set the Cybersecurity track data
        } else {
          console.error('Invalid data structure for CybersecurityTrack');
          setTrack(null); // Set to null if data is malformed
        }
      })
      .catch(err => {
        console.error('Failed to fetch Cybersecurity track data:', err);
        setTrack(null);
      });
  };

  return (
    <div className="page">
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">Track Search</div>
        </div>
      </nav>

      <div className="content-wrapper">
        {student ? (
          <>
            <h3>Welcome, {student.firstName} {student.lastName}</h3>
            {track ? (
              <div>
                <h3>Track: Cybersecurity</h3>
                <ul className="course-list">
                  {track.map((course, index) => (
                    <li key={index} className="course-item">
                      <strong>{course.course_number || 'TBD'}:</strong> {course.course} – {course.credits} credits ({course.semester || 'N/A'})
                      <br />
                      <Link
                        to={`/sections/${course.course_number}`}
                        className="view-sections-button"
                      >
                        View Sections
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>Loading track information...</p>
            )}
          </>
        ) : (
          <p>Please log in to view your track information.</p>
        )}
      </div>
    </div>
  );
}

export default TrackSearch;
