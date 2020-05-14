const request = require('request');
const geocode = (address, callback) => {
  const geocodeURL =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    encodeURIComponent(address) +
    '.json?limit=1&access_token=pk.eyJ1IjoiYWxpa29uZGllIiwiYSI6ImNrOXp4ZTlqNDBjMDIzZXBldno5ODYzOHAifQ.WmGBn7EOFjxPg8dRRZH5jg';
  request({ url: geocodeURL, json: true }, (error, { body }) => {
    const data = body;
    if (error) {
      callback(error);
    } else if (!data.features[0]) {
      const error = 'Unable to find location';
      callback(error);
    } else {
      const longitude = data.features[0].center[1];
      const latitude = data.features[0].center[0];
      const coordinates = {
        longitude,
        latitude,
      };
      callback(error, coordinates);
    }
  });
};

module.exports = geocode;
