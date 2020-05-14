const request = require('request');
const geocode = require('./geocode');

const fetchWeather = (longitude, latitude, callback) => {
  const url =
    'http://api.weatherstack.com/current?access_key=262b41fc6f6941afb31ce1455dc26f26&query=' +
    longitude +
    ',' +
    latitude;
  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      const error = 'could not connect to the server!';
      callback(error);
    } else if (body.error) {
      const error = 'could not find the location!';
      callback(error);
    } else {
      const data = body.current;
      const location = body.location;

      const adress =
        location.name +
        ', ' +
        (location.region || '') +
        ', ' +
        (location.country || '');
      const temp = data.temperature;
      const humidity = data.humidity;
      const description = data.weather_descriptions[0];
      const feelslike = data.feelslike;
      const weather = {
        adress,
        temp,
        humidity,
        description,
        feelslike,
      };
      callback(undefined, weather);
    }
  });
};

// const weather = (adress) => {
//   geocode(adress, (error, { longitude, latitude } = {}) => {
//     if (error) {
//       return console.log(error);
//     }
//     fetchWeather(longitude, latitude, (error, weather) => {
//       if (error) console.log(error);
//       else {
//         const temp = weather.temp;
//         const precip = weather.precip;
//         console.log(
//           'It is currently ' +
//             weather.temp +
//             '° in ' +
//             adress +
//             '. There is a ' +
//             weather.precip +
//             '% chance of rain.'
//         );
//         return {
//           temp: temp,
//           precip: precip,
//           adress: adress,
//         };
//       }
//     });
//   });
// };

module.exports = fetchWeather;
