const path = require('path');
const express = require('express');
const hbs = require('hbs');
const fetchWeather = require('./utils/weather');
const geocode = require('./utils/geocode');

console.log(__dirname);
console.log(path.join(__dirname, '../public'));

const app = express();

const port = process.env.PORT || 3000;

const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directotry
app.use(express.static(publicDirectory));

app.get('/weather', (req, res) => {
  if (!req.query.location) {
    return res.send({
      error: 'You must provide a location!',
    });
  }
  adress = req.query.location;
  geocode(adress, (error, { longitude, latitude } = {}) => {
    if (error) {
      return res.send({ error });
    }
    fetchWeather(longitude, latitude, (error, weather) => {
      if (error) {
        return res.send({ error });
      }

      const temp = weather.temp;
      const precip = weather.precip;
      const adress = weather.adress;
      const humidity = weather.humidity;
      const description = weather.description;
      const feelslike = weather.feelslike;
      res.send({
        temp: temp,
        precip: precip,
        adress: adress,
        humidity,
        description,
        feelslike,
      });
    });
  });
});

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Taki Eddine Yamani',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Taki Eddine Yamani',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'just type the location in the search bar!',
    title: 'Help',
    name: 'Taki Eddine Yamani',
  });
});

app.get('', (req, res) => {
  res.send('<h1>Weather</h1>');
});

app.get('/help/*', (req, res) => {
  res.send('My 404 page');
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    message: 'Page not found!',
    name: 'Taki Eddine Yamani',
  });
});

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});
