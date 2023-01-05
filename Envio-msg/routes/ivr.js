const express = require('express');
const router = express.Router();
const twilio = require('twilio');

router.post('/', (req, res) => {
  // Crie uma resposta de voz que colete a entrada do usuário via discagem de teclado
  const gather = twilio.twiml.Gather({
    input: 'dtmf',
    timeout: 3,
    numDigits: 1,
    action: '/ivr/handle-input',
  });
  gather.say('Welcome to our IVR system. Press 1 for sales, 2 for support, or 3 for billing.');

  // Adicione a resposta de voz ao corpo da resposta
  res.type('text/xml');
  res.send(gather.toString());
});

router.post('/handle-input', (req, res) => {
  // Obtenha a entrada do usuário a partir da solicitação
  const input = req.body.Digits;

  let message;
  switch (input) {
    case '1':
      message = 'Thank you for choosing sales. Someone will be with you shortly.';
      break;
    case '2':
      message = 'Thank you for choosing support. Someone will be with you shortly.';
      break;
    case '3':
      message = 'Thank you for choosing billing. Someone will be with you shortly.';
      break;
    default:
      message = 'Sorry, I didn\'t understand that input. Please try again.';
      break;
  }

  // Crie uma resposta de voz com a mensagem apropriada
  const response = twilio.twiml.VoiceResponse();
  response.say(message);

  // Adicione a resposta de voz ao corpo da resposta
  res.type('text/xml');
  res.send(response.toString());
});
module.exports = router;
