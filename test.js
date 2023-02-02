const request = require('request');

request.get('http://localhost:3000/show-messages', (error, response, body) => {
  if (error) {
    console.error(error);
  } else {
    const data = JSON.parse(response.body);
    console.log(data);

  }
});
