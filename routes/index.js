const express = require('express'),
      router = express.Router(),
      sendGrid = require('@sendgrid/mail'),
      message = {
        to: 'hasani.rogers@gmail.com',
        from: 'hasani.rogers@gmail.com',
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
      };



/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Hasani&nbsp;Rogers' });
});

/* GET email */
router.get('/contactme', (request, responds) => {
  let message = {
    to: 'hasani.rogers@gmail.com',
    from: 'hasani.rogers@gmail.com',
    subject: 'Sending with SendGrid is Fun',
    text: request.body,
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };

  //sendGrid.setApiKey(process.env.SENDGRID_API_KEY);
  sendGrid.setApiKey('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');
  // console.log('hit the server');
  // console.log(message);
  sendGrid.send(message);
});

module.exports = router;
