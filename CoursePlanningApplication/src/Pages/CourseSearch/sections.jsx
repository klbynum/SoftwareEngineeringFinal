import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function sections() {
  const { course_number } = useParams();
  const [sections, setSections] = useState([]);

  useEffect(() => {
    if (!course_number) return;
    console.log('Looking for course_number:', course_number);

    fetch(`http://localhost:5001/sections/${course_number}`)
      .then(res => res.json())
      .then(data => {
        console.log('Fetched data:', data);
        const allSections = data.Sections || [];
        setSections(allSections);
      })
      .catch(err => console.error('Failed to fetch sections:', err));
  }, [course_number]);

  return (
    <div className="page">
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">Course Sections for {course_number}</div>
        </div>
      </nav>

      <div className="content-wrapper">
        {sections.length === 0 ? (
          <p>No sections found for this course.</p>
        ) : (
          <ul className="course-list">
            {sections.map((section, index) => (
              <li key={index} className="course-item">
                <strong>Professor:</strong> {section.Professor || 'N/A'} <br />
                <strong>Meeting Time:</strong> {section['Meeting Time'] || 'N/A'} <br />
                <strong>Days:</strong> {section['Day(s)'] || 'N/A'} <br />
                <strong>Seats Available:</strong> {section['Seat Available'] || 'N/A'}
              </li>
            ))}
          </ul>
        )}

        <Link to="/CourseSearch" className="back-button">Back to Search</Link>
      </div>
    </div>
  );
}

export default sections;
