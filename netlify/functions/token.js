const axios = require('axios');

exports.handler = async function(event, context) {
  const { code } = event.queryStringParameters;

  try {
    const response = await axios.post('https://oauth.mail.ru/token', {
      code,
      redirect_uri: 'https://master--snazzy-palmier-903703.netlify.app/login',
      client_id: 'bfc815235bb84333947c6a44e91684cd',
      client_secret: 'b456b855c91648c4a3a59806bd0c4769'
    });
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'An error occurred' }),
    };
  }
};