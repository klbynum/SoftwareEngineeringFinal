import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function Sections() {
  const { course_number } = useParams();
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [originalSeatCounts, setOriginalSeatCounts] = useState({});
  const [studentId, setStudentId] = useState(null);

  useEffect(() => {
    if (!course_number) return;

    fetchSections();

    const storedStudentId = localStorage.getItem('StudentID');
    if (storedStudentId) {
      setStudentId(storedStudentId);
    }
  }, [course_number]);

  const fetchSections = () => {
    fetch(`http://localhost:5001/sections/${course_number}`)
      .then(res => res.json())
      .then(data => {
        const allSections = data.Sections || [];
        setSections(allSections);

        const initialSeats = {};
        allSections.forEach((section, index) => {
          initialSeats[index] = section['Seat Available'];
        });
        setOriginalSeatCounts(initialSeats);
      })
      .catch(err => console.error('Failed to fetch sections:', err));
  };

  const handleAddToSchedule = (index) => {
    const selectedSection = sections[index];

    if (selectedSection['Seat Available'] > 0) {
      setLoading(true);

      fetch('http://localhost:5001/sections/updateSeat', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ course_number, section_index: index })
      })
        .then(res => res.json())
        .then(data => {
          setLoading(false);
          if (data.error) {
            alert(data.error);
          } else {
            fetchSections(); // Refresh seats after update
          }
        })
        .catch(err => {
          setLoading(false);
          console.error('Error updating seat count:', err);
          alert('Failed to update seats.');
        });
    } else {
      alert('No seats available.');
    }
  };

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
                <strong>Location:</strong> {section.Location || 'N/A'} <br />
                <strong>Seats Available:</strong> {section['Seat Available']} <br />
                <button
                  type="button"
                  onClick={() => handleAddToSchedule(index)}
                  style={{
                    backgroundColor: section['Seat Available'] > 0 ? '#047857' : '#D1D5DB',
                    color: 'black',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.375rem',
                    cursor: section['Seat Available'] > 0 ? 'pointer' : 'not-allowed',
                    marginTop: '0.5rem'
                  }}
                  disabled={section['Seat Available'] <= 0 || loading}
                >
                  {loading ? 'Updating...' : 'Add to schedule'}
                </button>
              </li>
            ))}
          </ul>
        )}

        <Link to="/CourseSearch" className="back-button">Back to Search</Link>
      </div>
    </div>
  );
}

export default Sections;


