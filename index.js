const express = require('express');
const app = express();
const sendSmsRoute = require('./Envio-msg/routes/send-sms');
const ivrRoute = require('./Envio-msg/routes/ivr');
const sendEmail = require('./Envio-msg/routes/email');
const showMessage = require ('./Envio-msg/routes/show-messages');
const status = require('./Envio-msg/routes/stats');



require('dotenv').config();

app.use(express.urlencoded({ extended: false }));

app.use('/send-msg', sendSmsRoute)
app.use('/ivr', ivrRoute);
app.use('/email', sendEmail);
app.use('/stats', status);
app.use('/show-messages', showMessage);



const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

