
        // getStreams.js

exports.handler = async function(event, context) {
  try {
    // Use dynamic import for node-fetch
    import('node-fetch').then(({ default: fetch }) => {
      fetch('https://joyful-custard-ec7795.netlify.app/.netlify/functions/getStreams') // Replace with your Netlify Function URL
        .then(response => response.json())
        .then(data => {
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
        })
        .catch(error => {
          return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message || 'Internal server error' }),
          };
        });
    });
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || 'Internal server error' }),
    };
  }
};
