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

// Software Engineering Track Route
app.get('/softwareEngineerTrack', (req, res) => { 
    fs.readFile(softwareEngineeringTrack, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read software engineering track' });
        }
        try {
            const softTrack = JSON.parse(data);
            res.json({ SoftwareEngineerTrack: softTrack }); // Wrap response in object
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
            res.json({ CybersecurityTrack1: cyberTrack }); // Wrap response in object
        } catch (parseErr) {
            console.error('Failed to parse track: ', parseErr);
            res.status(500).json({ error: 'Invalid JSON format on Cybersecurity track' });
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
