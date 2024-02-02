// functions/getStreams.js

const fs = require('fs').promises;
const path = require('path');
const { google } = require('googleapis');

const API_KEY = 'AIzaSyCHS4L8HmcPQYwOcGFZrWAqlUrBQKt7b3E';
const CHANNEL_ID = 'UC5dIymK_x_NSNdqE7P5FETQ';
const DATA_FILE_PATH = path.join(__dirname, 'https://joyful-custard-ec7795.netlify.app/data.json');

const youtube = google.youtube({
  version: 'v3',
  auth: API_KEY,
});

async function updateDataPeriodically() {
  try {
    const upcomingStreams = await getUpcomingStreams(CHANNEL_ID);

    if (upcomingStreams.length > 0) {
      const originalUrl = 'https://www.youtube.com/embed/lzGHcHrHLb0'; // Replace with your original video ID
      const newUrl = replaceVideoId(originalUrl, upcomingStreams[0]);

      const updatedData = { updatedUrl: newUrl, upcomingStreams };

      // Store the updated data in a JSON file
      await fs.writeFile(DATA_FILE_PATH, JSON.stringify(updatedData, null, 2));

      console.log('Data updated successfully:', updatedData);
    } else {
      console.log('No upcoming streams found.');
    }
  } catch (error) {
    console.error('Error updating data:', error.message);
  }
}

async function getStoredData() {
  try {
    // Check if the file exists before reading
    const fileExists = await fs.access(DATA_FILE_PATH).then(() => true).catch(() => false);

    if (!fileExists) {
      console.error('Error: data.json file not found.');
      return null;
    }

    // Read the stored data from the JSON file
    const data = await fs.readFile(DATA_FILE_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading stored data:', error.message);
    return null;
  }
}

function replaceVideoId(url, newVideoId) {
  const parsedUrl = new URL(url);
  parsedUrl.searchParams.set('v', newVideoId);
  return parsedUrl.toString();
}

// Trigger the data update every day at a specific time (e.g., 3 AM UTC)
const updateInterval = 24 * 60 * 60 * 1000; // 24 hours
setInterval(updateDataPeriodically, updateInterval);
updateDataPeriodically(); // Initial update on server start

exports.handler = async function (event, context) {
  // Retrieve the stored data from the JSON file
  const storedData = await getStoredData();

  if (storedData) {
    const headers = {
      'Access-Control-Allow-Origin': '*', // or specify the origin of your website
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json',
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(storedData),
    };
  } else {
    const headers = {
      'Access-Control-Allow-Origin': '*', // or specify the origin of your website
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json',
    };

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Error retrieving stored data.' }),
    };
  }
};
