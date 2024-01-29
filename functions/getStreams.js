
Certainly! Here's the modified getStreams.js file with the updated fetch import:

javascript
Copy code
// getStreams.js

exports.handler = async function(event, context) {
  try {
    // Use dynamic import for node-fetch
    const fetch = (await import('node-fetch')).default;

    const response = await fetch('https://www.example.com/.netlify/functions/getStreams'); // Replace with your Netlify Function URL
    const data = await response.json();

    if (response.ok) {
      return {
        statusCode: 200,
        body: JSON.stringify({ updatedUrl: data.updatedUrl, upcomingStreams: data.upcomingStreams }),
      };
    } else {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: data.error || 'Failed to fetch data' }),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || 'Internal server error' }),
    };
  }
};