document.getElementById('pollForm').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const formData = new FormData(e.target);
    const q1 = formData.get('q1');
    const q2 = formData.get('q2');
    const q3 = formData.get('q3');
  
    if (!q1 || !q2 || !q3) {
      alert('Please answer all questions!');
      return;
    }
  
    try {
      const response = await fetch('/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ q1, q2, q3 }),
      });
  
      const result = await response.json();
      alert(result.message);
  
      // Fetch and display updated results
      const results = await fetch('/http://localhost:80/results');
      const pollData = await results.json();
      document.getElementById('results').textContent = JSON.stringify(pollData, null, 2);
    } catch (err) {
      console.error('Error submitting poll:', err);
      alert('Error submitting poll.');
    }
  });
  