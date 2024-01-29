// public.js

// Function to fetch data from the Netlify Function
async function fetchData() {
  try {
    const response = await fetch('https://your-netlify-app.netlify.app/.netlify/functions/getStreams');
    const data = await response.json();
    
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.error || 'Failed to fetch data');
    }
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const data = await fetchData();
    
    // Update your HTML with the data
    document.getElementById('output').innerHTML = `<p>Updated URL: ${data.updatedUrl}</p>`;
    
    if (data.upcomingStreams.length > 0) {
      document.getElementById('output').innerHTML += `<p>Upcoming Stream ID: ${data.upcomingStreams[0]}</p>`;
    } else {
      document.getElementById('output').innerHTML += '<p>No upcoming streams found.</p>';
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
});