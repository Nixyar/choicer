const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();
const bodyParser = require('body-parser')
const {LoginApi} = require('./src/api/login.api');
const PORT = process.env.PORT || 3000;

const headers = {
  auth: {
    username: 'bfc815235bb84333947c6a44e91684cd',
    password: 'b456b855c91648c4a3a59806bd0c4769',
  },
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
};

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(`${__dirname}/build/`));

app.post(LoginApi.GET_USER, async (req, res) => {
  const data = req.body;

  try {
    const response = await axios.get(`https://oauth.mail.ru/userinfo?access_token=${data.access_token}`);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.post(LoginApi.GET_TOKEN, async (req, res) => {
  const postData = req.body;

  try {
    const body = {
      code: postData.code,
      redirect_uri: 'https://choicer.netlify.app/login',
      grant_type: 'authorization_code'
    };

    const response = await axios.post('https://oauth.mail.ru/token', body, headers);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.post(LoginApi.UPDATE_TOKEN, async (req, res) => {
  const data = req.body;

  try {
    const body = {
      refresh_token: data.refresh_token,
      client_id: 'bfc815235bb84333947c6a44e91684cd',
      grant_type: 'refresh_token'
    };

    const response = await axios.post('https://oauth.mail.ru/token', body, headers);
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
