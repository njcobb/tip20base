// Import dependencies
const express = require('express');             // Core web framework used to create server, simplifies HTTP requests/responses
const bodyParser = require('body-parser');      // Helps parse incoming request bodies sent to the server
const cors = require('cors');                   // Allows server to accept requests from other domains (necessary for front-end)

const path = require('path');                   // Path module for proper file paths

// Initialize/use imported dependencies
const app = express();                          // Initialize Express Application
app.use(cors());                                // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json());                     // Parse JSON requests

// Serve static files from the root directory (where index.html, app.js, and style.css are)
app.use(express.static(path.join(__dirname, '..')));  // Go one level up from 'Backend' folder

// Poll data
let pollData = { JavaScript: 0, Python: 0, Java: 0, C: 0 };

// Endpoint to submit a vote
app.post('/vote', (req, res) => {
    const choice = req.body.choice;                         // Holds user's choice
    console.log('Received vote for:', choice);              // Log the received choice

    if (pollData[choice] !== undefined) {                   // If poll choice is not undefined
        pollData[choice]++;                                 // Increment count
        console.log('Updated poll data:', pollData);        // Log the updated poll data
        res.json({ message: 'Vote recorded!' });            // Send success message
    } else {
        res.status(400).json({ error: 'Invalid choice' });  // Send error message
    }
});

// Endpoint to fetch poll results
app.get('/results', (req, res) => {
    res.json(pollData);
});

// Declare port number
const PORT = 3000;

// Start the server
app.listen(PORT, () => console.log('Server running on http://localhost:3000'));
