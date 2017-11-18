const express = require('express'),
      router = express.Router(),
      sendGrid = require('@sendgrid/mail');

/* GET Home */
router.get('/', (req, res) => {
  res.render('index', { title: 'Hasani&nbsp;Rogers' });
});

/* POST Email */
router.post('/contact', (request, response) => {
  response.setHeader('Content-Type', 'text/plain');




  // let message = {
  //   to: 'hasani.rogers@gmail.com',
  //   from: 'hasani.rogers@gmail.com',
  //   subject: 'Sending with SendGrid is Fun',
  //   text: request.body,
  //   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  // };




  console.log(JSON.stringify(request.body));

  //sendGrid.setApiKey(process.env.SENDGRID_API_KEY);
  sendGrid.setApiKey('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');
  // console.log('hit the server');
  // console.log(message);
  //sendGrid.send(message);

  response.status(200).json({ status: 'SUCCESS' });
  response.end(JSON.stringify(request.body, null, 2));
});

module.exports = router;
