import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import axios from 'axios';

interface ITokenBody {
  code: string;
}

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  const code: string = JSON.parse(event.body + '').code;

  try {
    const body = {
      code,
      redirect_uri: 'https://master--snazzy-palmier-903703.netlify.app/login',
      client_id: 'bfc815235bb84333947c6a44e91684cd',
      client_secret: 'b456b855c91648c4a3a59806bd0c4769'
    };
    const response = await axios.post('https://oauth.mail.ru/token', body);
    return {
      statusCode: 200,
      body: JSON.stringify(body),
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
