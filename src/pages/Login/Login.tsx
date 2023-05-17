import React, {useEffect} from 'react'
import './Login.css';
import {useNavigate} from 'react-router';
import Logo from '../../img/logo(dark).svg';
import LogoText from '../../img/text-logo(dark).png';
import MailBtn from '../../img/mailru.png';
import {ITokenResponse} from '../../interfaces/login.interface';
import axios from 'axios';
import {getCookie, setCookie} from 'react-use-cookie';
import {IUser} from '../../interfaces/user.interfaces';
import {routes} from '../../Root';
import {updateUserName} from '../../store/actions/user';
import {store} from '../../store';

const crypto = require('crypto');

export const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (getCookie('access_token')) {
      getUserInfo();
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
    const redirectUri = 'https://snazzy-palmier-903703.netlify.app/login';
    const clientId = 'bfc815235bb84333947c6a44e91684cd';
    const responseType = 'code';

    window.location.href = `https://oauth.mail.ru/login?client_id=${clientId}&response_type=${responseType}&scope=&redirect_uri=${redirectUri}&state=${nonce}`;
  }

  async function getToken(code: string) {
    const data = {
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: 'https://snazzy-palmier-903703.netlify.app/login',
    };
    const config = {
      auth: {
        username: 'bfc815235bb84333947c6a44e91684cd',
        password: 'b456b855c91648c4a3a59806bd0c4769',
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
    try {
      const response: ITokenResponse = await axios.post('https://oauth.mail.ru/token', data, config);
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
      const response: IUser = await axios.get(`https://oauth.mail.ru/userinfo?access_token=${access_token}`);
      console.log(response);
      store.dispatch(updateUserName(response))
      navigate(routes.main);
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
          <img className="login-form__mail-button" onClick={onLogin} src={MailBtn} alt="Вход через mail.ru"/>
        </div>
      </div>
  )
}