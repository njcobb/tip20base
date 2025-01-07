document.getElementById('pollForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent default form submission

    // Collect user responses
    const formData = new FormData(e.target);
    const data = {
        q1: formData.get('q1'),
        q2: formData.get('q2'),
        q3: formData.get('q3'),
    };

    // Send the data to the backend
    try {
        const response = await fetch('http://3.135.228.238/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        console.log(result.message);

        // Fetch updated poll results
        fetchResults();

        // Redirect to the 'Thank You' page
        window.location.href = 'thankyou.html';
    } catch (error) {
        console.error('Error submitting poll:', error);
    }
});

// Function to fetch poll results
function fetchResults() {
    fetch('http://3.135.228.238/results')
        .then((response) => response.json())
        .then((data) => {
            const resultsDiv = document.getElementById('results');
            resultsDiv.style.display = 'block';
            resultsDiv.innerHTML = `
                <h2>Poll Results:</h2>
                <p>Question 1: ${JSON.stringify(data.q1, null, 2)}</p>
                <p>Question 2: ${JSON.stringify(data.q2, null, 2)}</p>
                <p>Question 3: ${JSON.stringify(data.q3, null, 2)}</p>
            `;
        })
        .catch((error) => console.error('Error fetching results:', error));
}

// Fetch initial results on page load
fetchResults();

