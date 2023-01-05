const express = require('express');
const router = express.Router();
const twilio = require('twilio');


const dbPassword = process.env.DB_PASSWORD;

require('dotenv').config();

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;

const client = new twilio(accountSid, authToken);

router.post('/', (req, res) => {
  const { to, body } = req.body;
  client.messages
    .create({
      to: '5581997150571',
      body: 'Seja bem vindo ao meu serviço',
      from: '12183046079',
    })
    .then(() => {
      res.send('Mensagem enviada com sucesso');
    })
    .catch((error) => {
      console.error(error);
      res.send('Erro ao enviar mensagem');
    });
});

module.exports = router;
