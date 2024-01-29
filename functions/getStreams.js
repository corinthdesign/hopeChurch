// functions/getStreams.js

const { google } = require('googleapis');

const API_KEY = 'AIzaSyCHS4L8HmcPQYwOcGFZrWAqlUrBQKt7b3E';
const CHANNEL_ID = 'UC5dIymK_x_NSNdqE7P5FETQ';

const youtube = google.youtube({
  version: 'v3',
  auth: API_KEY,
});

exports.handler = async function(event, context) {
  try {
    // Use dynamic import for node-fetch
    const fetch = (await import('node-fetch')).default;

    const response = await fetch('https://joyful-custard-ec7795.netlify.app/.netlify/functions/getStreams'); // Replace with your Netlify Function URL
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

async function getUpcomingStreams(channelId) {
  const response = await youtube.search.list({
    part: 'id',
    channelId: channelId,
    eventType: 'upcoming',
    type: 'video',
  });

  const upcomingStreams = response.data.items.map(item => item.id.videoId);
  return upcomingStreams;
}

function replaceVideoId(url, newVideoId) {
  const parsedUrl = new URL(url);
  parsedUrl.searchParams.set('v', newVideoId);
  return parsedUrl.toString();
}
