


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
    // Your existing logic to fetch data
    const data = {
      updatedUrl: 'https://www.youtube.com/watch?v=UpdatedVideoID',
      upcomingStreams: ['UpcomingStreamID1', 'UpcomingStreamID2'],
    };

    // CORS headers
    const headers = {
      'Access-Control-Allow-Origin': '*', // or specify the origin of your website
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json',
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ updatedUrl: data.updatedUrl, upcomingStreams: data.upcomingStreams }),
    };
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
