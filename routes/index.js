const express = require('express'),
      router = express.Router(),
      bodyParser = require('body-parser'),
      sendGrid = require('@sendgrid/mail');

/* GET Home */
router.get('/', (req, res) => {
  res.render('index', { title: 'Hasani&nbsp;Rogers' });
});

/* POST Email */
router.post('/contact', (request, response) => {
  let message = {
    to: 'hasani.rogers@gmail.com',
    from: request.body.email,
    subject: request.body.user + ' wants your professional attention!',
    text: request.body.message,
    html: request.body.message,
  };

  // node requires text/plain
  response.setHeader('Content-Type', 'text/plain');

  sendGrid.setApiKey(process.env.SENDGRID_API_KEY);
  sendGrid.send(message);

  // make sure you respond with a status and end the connection
  response.status(200).json({ status: 'SUCCESS' });
  response.end(JSON.stringify(request.body, null, 2));
});

module.exports = router;
