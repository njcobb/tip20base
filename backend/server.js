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

// Poll data: Track responses for each question
let pollData = {
    // Survey question 1
    q1: {
        Always: 0,
        SometimesGoodService: 0,
        SometimesNiceRestaurant: 0,
        RarelyExceptionalService: 0,
        Never: 0,
    },
    // Survey question 2
    q2: {
        Absolutely: 0,
        YesIncentive: 0,
        SometimesWhereAt: 0,
        NoRarelyTip: 0,
    },
    // Survey question 3
    q3: {
        YesSignUp: 0,
        MaybeNeedInfo: 0,
        MaybeRewards: 0,
        NoNotAtAll: 0,
    },
};

// Endpoint to submit poll responses
app.post('/submit', (req, res) => {
    const { q1, q2, q3 } = req.body;

    if (q1 && pollData.q1[q1] !== undefined) pollData.q1[q1]++;
    if (q2 && pollData.q2[q2] !== undefined) pollData.q2[q2]++;
    if (q3 && pollData.q3[q3] !== undefined) pollData.q3[q3]++;

    console.log('Updated poll data:', pollData);

    res.json({ message: 'Poll responses recorded successfully!' });
});

// Endpoint to fetch poll results
app.get('/results', (req, res) => {
    res.json(pollData);
});

// Declare port number
const PORT = 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
