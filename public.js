// public.js

// Function to fetch data from the Netlify Function
const fetchData = async () => {
  try {
    const response = await fetch('https://joyful-custard-ec7795.netlify.app/.netlify/functions/getStreams');

    if (response.ok) {
      const data = await response.json();
      console.log('Fetched Data:', data);

      // Use the data as needed (e.g., update the HTML with the embedded video)
      updateUI(data);
    } else {
      console.error('Error fetching data:', response.statusText);
    }
  } catch (error) {
    console.error('Error fetching data:', error.message);
  }
};

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const data = await fetchData();

    const headers = {
      'Access-Control-Allow-Origin': '*', // or specify the origin of your website
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json',
    };
    
    // Update your HTML with the data
    document.getElementById('output').innerHTML = `<p>Updated URL: ${data.updatedUrl}</p> <iframe width="560" height="315" src="${data.updatedUrl}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
    
    if (data.upcomingStreams.length > 0) {
      document.getElementById('output').innerHTML += `<p>Upcoming Stream ID: ${data.upcomingStreams[0]}</p>`;
    } else {

      const headers = {
        'Access-Control-Allow-Origin': '*', // or specify the origin of your website
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json',
      };
      document.getElementById('output').innerHTML += '<p>No upcoming streams found.</p>';
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
});