import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function Sections() {
  const { course_number } = useParams();
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasAdded, setHasAdded] = useState(false);
  const [originalSeatCounts, setOriginalSeatCounts] = useState({});
  const [studentId, setStudentId] = useState(null);

  useEffect(() => {
    if (!course_number) return;

    fetchSections();

    const addedCourses = JSON.parse(localStorage.getItem('addedCourses') || '[]');
    if (addedCourses.includes(course_number)) {
      setHasAdded(true);
    }

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
    if (hasAdded) {
      alert('You have already added this course.');
      return;
    }

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
            setHasAdded(true);
            const addedCourses = JSON.parse(localStorage.getItem('addedCourses') || '[]');
            if (!addedCourses.includes(course_number)) {
              addedCourses.push(course_number);
              localStorage.setItem('addedCourses', JSON.stringify(addedCourses));
            }

            postToSchedule(index);
            fetchSections();
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

  const postToSchedule = (index) => {
    const selectedSection = sections[index];

    const schedule = {
      studentId,
      courses: [
        {
          course_number: selectedSection.course_number,
          section_index: selectedSection.section_index
        }
      ]
    };

    fetch('http://localhost:5001/schedule', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(schedule)
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          alert('Failed to save schedule: ' + data.error);
        } else {
          alert('Schedule saved successfully!');
        }
      })
      .catch(err => {
        console.error('Error saving schedule:', err);
        alert('Failed to save schedule.');
      });
  };

  const handleResetAddedCourses = () => {
    localStorage.removeItem('addedCourses');
    setHasAdded(false);

    const updatedSections = sections.map((section, index) => {
      if (originalSeatCounts[index] !== undefined) {
        section['Seat Available'] = originalSeatCounts[index];
      }
      return section;
    });

    setSections(updatedSections);

    updatedSections.forEach((section, index) => {
      if (section['Seat Available'] !== originalSeatCounts[index]) {
        fetch('http://localhost:5001/sections/updateSeat', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ course_number, section_index: index })
        }).catch(err => console.error('Error resetting seats:', err));
      }
    });

    alert('Added courses have been reset, and seats are restored.');
    window.location.reload();
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
                    backgroundColor: section['Seat Available'] > 0 && !hasAdded ? '#047857' : '#D1D5DB',
                    color: 'black',
                    border: 'none',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.375rem',
                    cursor: section['Seat Available'] > 0 && !hasAdded ? 'pointer' : 'not-allowed',
                    marginTop: '0.5rem'
                  }}
                  disabled={section['Seat Available'] <= 0 || loading || hasAdded}
                >
                  {hasAdded ? 'Already Added' : loading ? 'Updating...' : 'Add to schedule'}
                </button>
              </li>
            ))}
          </ul>
        )}

        <button
          onClick={handleResetAddedCourses}
          style={{
            backgroundColor: '#D1D5DB',
            color: 'black',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '0.375rem',
            cursor: 'pointer',
            marginTop: '1rem'
          }}
        >
          Reset Added Courses (Debugging)
        </button>

        <Link to="/CourseSearch" className="back-button">Back to Search</Link>
      </div>
    </div>
  );
}

export default Sections;


