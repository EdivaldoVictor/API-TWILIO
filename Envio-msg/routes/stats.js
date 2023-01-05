const express = require('express');
const router = express.Router();
const twilio = require('twilio');

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

router.get('/', (req, res) => {
  const statistics = {
    sent: 0,
    delivered: 0,
    failed: 0,
  };

  client.messages.each(messages => {
    switch (messages.status) {
      case 'sent':
        statistics.sent++;
        break;
      case 'delivered':
        statistics.delivered++;
        break;
      case 'failed':
        statistics.failed++;
        break;
      default:
        break;
    }
  }, (error, message) => {
    if (error) {
      console.error(error);
      res.send('Erro ao obter estatísticas de envio');
    } else {
      res.send(statistics);
    }
  });
});

module.exports = router;
