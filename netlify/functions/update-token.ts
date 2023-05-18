import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import axios from 'axios';

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  const refreshToken: string = JSON.parse(event.body + '').refresh_token;

  try {
    const body = {
      refresh_token: refreshToken,
      client_id: 'bfc815235bb84333947c6a44e91684cd',
      grant_type: 'refresh_token'
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

    const response = await axios.post('https://oauth.mail.ru/token', body, headers);

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

export { handler };
