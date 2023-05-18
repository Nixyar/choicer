import React, {useEffect} from 'react'
import './Login.css';
import {useNavigate} from 'react-router';
import {LoginApi} from '../../api/login.api';
import Logo from '../../img/logo(dark).svg';
import LogoText from '../../img/text-logo(dark).png';
import MailBtn from '../../img/mailru.png';
import {ITokenResponse} from '../../interfaces/login.interface';
import axios from 'axios';
import {getCookie, setCookie} from 'react-use-cookie';
import {IUser} from '../../interfaces/user.interfaces';
import {routes} from '../../Root';
import {setUserName} from '../../store/actions/user';
import {store} from '../../store';

const crypto = require('crypto');

export const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    if (getCookie('access_token')) {
      getUserInfo().then();
    } else {
      const urlSearchParams = new URLSearchParams(window.location.search);
      const code = urlSearchParams.get('code');
      if (code) getToken(code).then();
    }
  }

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

  const getToken = async (code: string) => {
    const data = {
      code: code
    };
    try {
      const response = await axios.post(LoginApi.GET_TOKEN, data);
      console.log(response.data);
      return console.log(response.data.access_token);
      // setCookie('access_token', response.access_token);
      // setCookie('refresh_token', response.refresh_token, {days: 30});
      // await getUserInfo().then();
    } catch (error) {
      return console.error(error);
    }
  }

  async function getUserInfo() {
    const body = {
      access_token: getToken('access_token')
    };
    try {
      const response: IUser = await axios.post(LoginApi.GET_USER, body);
      return console.log(response);
      // store.dispatch(setUserName(response))
      // navigate(routes.main);
    } catch (error) {
      return console.error(error);
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