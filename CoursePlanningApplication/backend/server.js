const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');
const path = require('path');

app.use(cors());
app.use(express.json());

// Home Route
app.get('/', (req, res) => {
    res.send('API is running...');
});

const softwareEngineeringTrack = './data/SoftwareEngineer/SoftwareEngineerTrack.json';
const cyberSecurityTrack = './data/CybersecurityTrack/CybersecurityTrack.json'; 
const stuRecFile = './data/students.json';
const courseSectionsFile = './data/courseSections.json';
const courseTakenFile = './data/coursesTaken.json'

// Software Engineering Track Route
app.get('/softwareEngineerTrack', (req, res) => { 
    fs.readFile(softwareEngineeringTrack, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read software engineering track' });
        }
        try {
            const softTrack = JSON.parse(data);
            res.json(softTrack);
        } catch (parseErr) {
            console.error('Failed to parse track: ', parseErr);
            res.status(500).json({ error: 'Invalid JSON format on software engineering track' });
        }
    });
});

// Cybersecurity Track Route
app.get('/cybersecurityTrack', (req, res) => {
    fs.readFile(cyberSecurityTrack, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read Cybersecurity track' });
        }
        try {
            const cyberTrack = JSON.parse(data);
            res.json(cyberTrack);
        } catch (parseErr) {
            console.error('Failed to parse track: ', parseErr);
            res.status(500).json({ error: 'Invalid JSON format on Cybersecurity track' });
        }
    });
});

app.get('/students', (req, res) => {
    fs.readFile(stuRecFile, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read student records' });
        }
        try {
            const stuRecords = JSON.parse(data);
            res.json(stuRecords);
        } catch (parseErr) {
            console.error('Failed to parse track: ', parseErr);
            res.status(500).json({ error: 'Invalid JSON format on student records' });
        }
    });
});
app.get('/courseTaken', (req, res) => {
    fs.readFile(courseTakenFile, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read sections json' });
        }
        try {
            const courTake = JSON.parse(data);
            res.json(courTake);
        } catch (parseErr) {
            console.error('Failed to parse track: ', parseErr);
            res.status(500).json({ error: 'Invalid JSON format on sections json' });
        }
    });
});

app.get('/sections', (req, res) => {
    fs.readFile(courseSectionsFile, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read sections json' });
        }
        try {
            const stuSections = JSON.parse(data);
            res.json(stuSections);
        } catch (parseErr) {
            console.error('Failed to parse track: ', parseErr);
            res.status(500).json({ error: 'Invalid JSON format on sections json' });
        }
    });
});

app.get('/sections/:course_number', (req, res) => {
    const courseId = req.params.course_number.toLowerCase();

    fs.readFile(courseSectionsFile, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read sections json' });
        }
        try {
            const allSections = JSON.parse(data).Sections || [];

            const filtered = allSections.filter(
                section => section.course_number &&
                section.course_number.toLowerCase() === courseId
            );

            res.json({ Sections: filtered });
        } catch (parseErr) {
            console.error('Failed to parse sections JSON:', parseErr);
            res.status(500).json({ error: 'Invalid JSON format on sections json' });
        }
    });
});

// Catch-all route
app.use((req, res) => {
    console.log(`Unhandled request: ${req.method} ${req.originalUrl}`);
    res.status(404).send('Not Found');
});

const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
