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

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Submission response:', result);

      // Redirect to thank-you page
      window.location.href = 'thankyou.html';
  } catch (err) {
      console.error('Error submitting poll:', err);
      alert('Error submitting poll. Please try again.');
  }
});
