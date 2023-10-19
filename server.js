const express = require('express');
const bodyParser = require('body-parser');
const mailgun = require('mailgun-js');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 4500; 



const mailgunClient = mailgun({ apiKey: api_key, domain: domain });

app.use(cors()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.post('/subscribe', (req, res) => {
  const { Email } = req.body;

  const mailgunData = {
    from: 'Jiya Thakur <jithakur1004@gmail.com>',
    to: Email,
    subject: 'Welcome',
    text: 'Welcome, Thanks for subscribing to our product. You will receive daily updates here.',
  };

  mailgunClient.messages().send(mailgunData, (error, body) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      console.log(body);
      res.json({ message: 'Email sent successfully' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});