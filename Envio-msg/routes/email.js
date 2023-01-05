const express = require('express');
const app = express();
const sgClient = require('@sendgrid/client');
const router = express.Router();

async function sendEmail(to, subject, body) {
  // Defina sua chave de API do SendGrid e crie uma instância do cliente
    
  const apiKey = 'SUA_CHAVE_DE_API';
  const client = sgClient.SendGridClient(apiKey);

  // Defina os dados do e-mail
  const request = {
    method: 'POST',
    url: '/v3/mail/send',
    body: {
      personalizations: [{ to: [{ email: to }] }],
      from: { email: 'seu@email.com' },
      subject: subject,
      content: [{ type: 'text/plain', value: body }]
    }
  };

  // Envie o e-mail usando o cliente do SendGrid
  try {
    const response = await client.request(request);
    console.log(response.statusCode);
    console.log(response.body);
    console.log(response.headers);
  } catch (error) {
    console.error(error);
  }
}

router.post('/send-email', (req, res) => {
  const { to, subject, body } = req.body;
  sendEmail(to, subject, body);
  res.send('E-mail enviado com sucesso');
});

module.exports = router;

