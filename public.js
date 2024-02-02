// public.js

const fetchData = async () => {
  try {
    const response = await fetch('https://joyful-custard-ec7795.netlify.app/data.json');

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

const updateUI = (data) => {
  // Update the UI based on the fetched data
  const iframe = document.getElementById('youtube-iframe');
  
  if (data.updatedUrl) {
    iframe.src = "https://www.youtube.com/embed/" + data.upcomingStreams[0];
  } else {
    console.error('No updated URL in the fetched data.');
  }
};

// Trigger data fetching when the page loads
document.addEventListener('DOMContentLoaded', fetchData);
