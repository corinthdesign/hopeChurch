const fetch = import('node-fetch').default;

async function fetchLiveStreams() {
  try {
    const response = await fetch('https://joyful-custard-ec7795.netlify.app/.netlify/functions/getStreams');
    const data = await response.json();

    if (response.ok) {
      const outputDiv = document.getElementById('output');
      outputDiv.innerHTML = `<p>Updated URL: ${data.updatedUrl}</p>`;
      
      if (data.upcomingStreams.length > 0) {
        outputDiv.innerHTML += `<p>Upcoming Stream ID: ${data.upcomingStreams[0]}</p>`;
      } else {
        outputDiv.innerHTML += '<p>No upcoming streams found.</p>';
      }
    } else {
      console.error('Error:', data.error);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Fetch live streams when the page loads
fetchLiveStreams();
