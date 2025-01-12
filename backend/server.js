const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Serve static files from the "public" folder (e.g., index.html, script.js, style.css)
app.use(express.static(path.join(__dirname,'..', 'public')));

// Route to handle the root URL and serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'..', 'public', 'index.html'));
});


// Poll submission route
app.post('/vote', (req, res) => {
    const { q1, q2, q3 } = req.body;
    if (q1 && pollData.q1[q1] !== undefined) pollData.q1[q1]++;
    if (q2 && pollData.q2[q2] !== undefined) pollData.q2[q2]++;
    if (q3 && pollData.q3[q3] !== undefined) pollData.q3[q3]++;
    res.json({ message: 'Poll responses recorded successfully!' });
});

// Poll results route
app.get('/results', (req, res) => {
    res.json(pollData);
});

const PORT = 80;

// Declare AWS IP Address
AWS_IP_ADDR = "3.135.228.238"

// Start the server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://${AWS_IP_ADDR}:${PORT}`);
});
