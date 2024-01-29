// functions/getStreams.js

const { google } = require('googleapis');

const API_KEY = 'YOUR_API_KEY';
const CHANNEL_ID = 'TARGET_CHANNEL_ID';

const youtube = google.youtube({
  version: 'v3',
  auth: API_KEY,
});

exports.handler = async function(event, context) {
  try {
    const upcomingStreams = await getUpcomingStreams(CHANNEL_ID);

    if (upcomingStreams.length > 0) {
      const originalUrl = 'https://www.youtube.com/watch?v=ORIGINAL_VIDEO_ID';
      const newUrl = replaceVideoId(originalUrl, upcomingStreams[0]);
      return {
        statusCode: 200,
        body: JSON.stringify({ updatedUrl: newUrl, upcomingStreams }),
      };
    } else {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'No upcoming streams found.' }),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
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