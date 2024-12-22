const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse JSON requests

// Poll data
let pollData = { JavaScript: 0, Python: 0, Java: 0, C: 0 };

// Endpoint to submit a vote
app.post('/vote', (req, res) => {
    const choice = req.body.choice;
    if (pollData[choice] !== undefined) {
        pollData[choice]++;
        res.json({ message: 'Vote recorded!' });
    } else {
        res.status(400).json({ error: 'Invalid choice' });
    }
});

// Endpoint to fetch poll results
app.get('/results', (req, res) => {
    res.json(pollData);
});

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Fallback route to serve index.html for undefined routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Declare constant port
const PORT = 3000;

// Start the server
app.listen(PORT, () => console.log('Server running on http://localhost:3000'));
