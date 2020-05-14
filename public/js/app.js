const getWeather = (location) => {
  fetch('/weather?location=' + location).then((response) => {
    response.json().then((data) => {
      //messageOne.textContent = '';
      console.log(data);
      if (data.error) {
        messageOne.textContent = 'Error! ' + data.error;
      } else {
        messageOne.textContent = data.adress;
        messageTwo.textContent =
          data.description +
          '. It is currently ' +
          data.temp +
          '°, it feels like  ' +
          data.feelslike +
          '° with ' +
          data.humidity +
          ' % of humidity ';
      }
    });
  });
};

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = search.value;
  messageOne.textContent = 'loading...';
  getWeather(location);
});
