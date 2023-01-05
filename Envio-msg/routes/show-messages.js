const express = require('express');
const app = express();
const router = express.Router();
const twilio = require('twilio');

async function getSentMessages() {
  // Defina o ID da conta e o token de autenticação do Twilio
  const accountSid = 'AC2b6cd152cd289d280f83706c3f757ba0';
  const authToken = 'b64a98ef00da3adc9caa73f95e5f7e8e';

  // Crie uma instância do cliente do Twilio
  const client = new twilio(accountSid, authToken);

  // Obtenha as mensagens enviadas recentemente usando o método `messages.list()` do cliente do Twilio
  try {
    const messages = await client.messages.list({ limit: 20 });
    return messages;
  } catch (error) {
    console.error(error);
  }
}

router.get('/', (req, res) => {
  getSentMessages()
    .then((messages) => {
      res.send(messages);
    })
    .catch((error) => {
      console.error/*  */(error);
      res.send('Erro ao obter mensagens enviadas');
    });
});

module.exports = router;


