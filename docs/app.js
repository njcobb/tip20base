document.getElementById('voteForm').addEventListener('submit', function (e) {
    e.preventDefault();  // Prevent the form from submitting the traditional way

    // Get the selected programming language
    const selectedLanguage = document.querySelector('input[name="language"]:checked');
    if (selectedLanguage) {
        const language = selectedLanguage.value;

        // Send the vote to the back-end server (POST request)
        fetch('http://localhost:3000/vote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ choice: language }),
        })
        .then(response => response.json())
        .then(data => {
            // Log the server's response (success or error message)
            console.log(data.message);

            // Fetch updated poll results
            fetchResults();
        })
        .catch(error => {
            console.error('Error submitting vote:', error);
        });
    } else {
        alert('Please select a programming language to vote for!');
    }
});

// Function to fetch poll results (GET request)
function fetchResults() {
    fetch('http://localhost:3000/results')
    .then(response => response.json())
    .then(data => {
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = `
            <p>JavaScript: ${data.JavaScript}</p>
            <p>Python: ${data.Python}</p>
            <p>Java: ${data.Java}</p>
            <p>Other: ${data.Other}</p>
        `;
    })
    .catch(error => {
        console.error('Error fetching results:', error);
    });
}

// Fetch initial results on page load
fetchResults();
