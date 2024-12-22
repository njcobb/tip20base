const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse JSON requests

// Poll data
let pollData = { JavaScript: 0, Python: 0, Java: 0, Vincent: 0 };

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

// Start the server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
