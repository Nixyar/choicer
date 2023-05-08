import React from 'react'
import './Login.css';
import Logo from "../../img/logo(dark).svg";
import LogoText from "../../img/text-logo(dark).png";

export const Login = () => {
  const onLogin = () => {
    document.location.href = 'https://oauth.mail.ru/login?client_id=47beccc8bd8c4b2ba04b08c332d4b2d0&response_type=code&scope=userinfo&redirect_uri=https://master--snazzy-palmier-903703.netlify.app/login';
  }

  return (
      <div className="login">
        <div className="login-information">
          <div className="login-information__logo">
            <img src={Logo} alt="Logo"/>
            <img src={LogoText} alt="choicer."/>
          </div>
          <h1 className="login-information__title h1">О сервисе</h1>
          <p className="login-information__text p2--light">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
            Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
          </p>
          <p className="p2--light">
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
            Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
          </p>
        </div>
        <div className="login-form">
          <h1 className="login-form__title h1">Добро пожаловать!</h1>
          <form>
            <a href="https://oauth.mail.ru/login">
              <button onClick={onLogin}>Вход через Mail.ru</button>
            </a>
          </form>
        </div>
      </div>
  )
}