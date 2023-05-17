const axios = require('axios');

exports.handler = async function(event, context) {
  const { code } = event.queryStringParameters;

  if (!code) {
    return {
      statusCode: 400,
      body: 'Missing code'
    };
  }

  try {
    const response = await axios.post('https://oauth.mail.ru/token', {
      code,
      redirect_uri: 'https://snazzy-palmier-903703.netlify.app/login',
      client_id: 'bfc815235bb84333947c6a44e91684cd',
      client_secret: 'b456b855c91648c4a3a59806bd0c4769',
      grant_type: 'authorization_code'
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: 'An error occurred'
    };
  }
};