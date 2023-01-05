const express = require('express');
const router = express.Router();
const twilio = require('twilio');

const accountSid = 'AC2b6cd152cd289d280f83706c3f757ba0';
const authToken = 'b64a98ef00da3adc9caa73f95e5f7e8e';
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
