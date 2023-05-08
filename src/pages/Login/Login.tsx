import React, {useEffect} from 'react'
import './Login.css';
import {useNavigate} from 'react-router';
import Logo from '../../img/logo(dark).svg';
import LogoText from '../../img/text-logo(dark).png';
import {ITokenResponse} from '../../interfaces/login.interface';
import axios from 'axios';
import {getCookie, setCookie} from 'react-use-cookie';
import {routes} from '../../Root';

const crypto = require('crypto');

export const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (getCookie('access_token')) {
      getUserInfo().then();
    } else {
      const urlSearchParams = new URLSearchParams(window.location.search);
      const code = urlSearchParams.get('code');
      if (code) {
        getToken(code).then();
      }
    }
  }, []);

  const onLogin = () => {
    let nonce = getCookie('nonce');
    if (!nonce) {
      nonce = crypto.randomBytes(32).toString('hex');
      document.cookie = `nonce=${nonce}`;
    }
    window.location.href = `https://oauth.mail.ru/xlogin?client_id=47beccc8bd8c4b2ba04b08c332d4b2d0&response_type=code&scope=&redirect_uri=https%3A%2F%2Fmaster--snazzy-palmier-903703.netlify.app%2Flogin&state=${nonce}`;
  }

  async function getToken(code: string) {
    const data = {
      code: code,
      redirect_uri: 'https://master--snazzy-palmier-903703.netlify.app/login',
    };
    try {
      const response: ITokenResponse = await axios.post('https://oauth.mail.ru/token', data, {
        auth: {
          username: '47beccc8bd8c4b2ba04b08c332d4b2d0',
          password: '2c289f33abb246ec92d9a1df8cb8cac7',
        },
        withCredentials: true,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      setCookie('access_token', response.access_token);
      setCookie('refresh_token', response.refresh_token, {days: 30});
      getUserInfo().then();
    } catch (error) {
      console.error(error);
    }
  }

  async function getUserInfo() {
    const access_token = getToken('access_token');
    try {
      const response = await axios.get(`https://oauth.mail.ru/userinfo?access_token=${access_token}`);
      console.log(response);
      navigate(routes.works);
    } catch (error) {
      console.error(error);
    }
  }

  return (
      <div className="login">
        <div className="login-information">
          <div className="login-information__logo">
            <img src={Logo} alt="Logo"/>
            <img src={LogoText} alt="choicer."/>
          </div>
          <h1 className="login-information__title h1">О сервисе</h1>
          <p className="login-information__text p2--light">Amet minim mollit non deserunt ullamco
            est sit aliqua dolor do amet sint.
            Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt
            nostrud amet.
          </p>
          <p className="p2--light">
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
            Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt
            nostrud amet.
          </p>
        </div>
        <div className="login-form">
          <h1 className="login-form__title h1">Добро пожаловать!</h1>
          <button type="button" onClick={onLogin}>Вход через Mail.ru</button>
        </div>
      </div>
  )
}