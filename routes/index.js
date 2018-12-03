const express = require('express');
const router = express.Router();
// const bodyParser = require('body-parser');
const sendGrid = require('@sendgrid/mail');

/* GET Home */
router.get('/', (req, res) => {
  res.render('index', { title: 'Hasani&nbsp;Rogers' });
});

/* POST Email */
router.post('/contact', (request, response) => {
  const message = {
    to: 'hasani.rogers@gmail.com',
    from: request.body.email,
    subject: request.body.user + ' wants your professional attention!',
    text: request.body.message,
    html: request.body.message,
  };

  const messageT = {
    to: 'hasani.rogers@gmail.com',
    from: 'hasani.rogers@gmail.com',
    subject: 'test',
    text: 'seriously, just a test'
  };

  response.setHeader('Content-Type', 'text/plain'); // node requires text/plain

  console.log('request body:');
  console.log(request.body);

  sendGrid.setApiKey(process.env.SENDGRID_API_KEY);

  sendGrid
    .send(message)
    .then(() => {
      // we're good send the data
      const responseData = {
        message: 'SUCCESS',
        code: 200,
      };

      response
        .status(200)
        .json(responseData);

      response.end(JSON.stringify(request.body, null, 2));
    })
    .catch(error => {
      // there was problem with sending the mail
      const {message, code} = error;

      const responseData = {
        message: message,
        code: code,
        body: error.response.body
      }

      response
        .status(code)
        .json(responseData);

      response.end(JSON.stringify(request.body, null, 2));
    });
});

module.exports = router;
