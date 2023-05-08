import React from 'react'
import './Login.css';
import Logo from '../../img/logo(dark).svg';
import LogoText from '../../img/text-logo(dark).png';
import {getCookie} from '../../utils/u.utils';

const crypto = require('crypto');

export const Login = () => {
  const onLogin = () => {
    let nonce = getCookie('nonce');
    if (!nonce) {
      nonce = crypto.randomBytes(32).toString('hex');
      document.cookie = `nonce=${nonce}`;
    }
    fetch(
        `https://oauth.mail.ru/xlogin?client_id=47beccc8bd8c4b2ba04b08c332d4b2d0&response_type=code&scope=&redirect_uri=https%3A%2F%2Fmaster--snazzy-palmier-903703.netlify.app%2Flogin&state=${nonce}`)
        .then(response => console.log(response))
        .then(data => {
          // Обработка полученных данных
        })
        .catch(error => console.log(error));
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