import React from 'react'
import './Login.css';
import Logo from '../../img/logo(dark).svg';
import LogoText from '../../img/text-logo(dark).png';
import MailBtn from '../../img/mailru.png';
import {getCookie} from 'react-use-cookie';

const crypto = require('crypto');

export const Login = () => {
  const onLogin = () => {
    let nonce = getCookie('nonce');

    if (!nonce) {
      nonce = crypto.randomBytes(32).toString('hex');
      document.cookie = `nonce=${nonce}`;
    }

    const redirectUri = 'https://choicer.netlify.app/login';
    const clientId = 'bfc815235bb84333947c6a44e91684cd';
    const responseType = 'code';

    window.location.href = `https://oauth.mail.ru/login?client_id=${clientId}&response_type=${responseType}&scope=&redirect_uri=${redirectUri}&state=${nonce}`;
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