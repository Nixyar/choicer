import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import axios from 'axios';

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  const accessToken	: string = JSON.parse(event.body + '').access_token;

  try {
    const response = await axios.post(`https://oauth.mail.ru/userinfo?access_token=${accessToken}`);

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
