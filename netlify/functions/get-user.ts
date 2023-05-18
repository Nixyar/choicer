import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import axios from 'axios';

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  const accessToken	: string = JSON.parse(event.body + '').access_token;

  try {
    const response = await axios.post(`https://oauth.mail.ru/userinfo?access_token=${accessToken}`);

    // Здесь идет обработка по имейлу. Добавление ролевой модели к пользователю
    if (response.data.email === 'cchoicer@bk.ru') {
      response.data.role = 'admin';
      response.data.phone = '+7 (351) 240-04-40';
      response.data.faculty = 'Frontend разработка';
      response.data.formEducation = 'очная';
    } else {
      response.data.role = 'user';
      response.data.phone = '';
      response.data.faculty = '';
      response.data.formEducation = 'очная';
    }

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
