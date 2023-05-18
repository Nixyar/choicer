const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(`${__dirname}/build/`));

app.post('/token', async (req, res) => {
  const postData = req.body;

  try {
    const data = {
      code: postData.code,
      redirect_uri: 'https://snazzy-palmier-903703.netlify.app/login',
      grant_type: 'authorization_code'
    };

    const headers = {
      auth: {
        username: 'bfc815235bb84333947c6a44e91684cd',
        password: 'b456b855c91648c4a3a59806bd0c4769',
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    const response = await axios.post('https://oauth.mail.ru/token', data, headers);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(PORT, () => {
  console.log(`App started on http://localhost:${PORT}/`);
});

app.get('*', (request, response) => {
  response.sendFile(path.resolve(`${__dirname}/build/index.html`));
});
