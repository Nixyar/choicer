import {Avatar} from '@mui/material';
import React from 'react';
import './Profile.css';
import {ArrowIcon} from '../../components/icons/Arrow';
import {Link} from 'react-router-dom';
import {routes} from '../../Root';

export const Profile = () => {
  return (
      <div className="profile">
        <Avatar src="" sx={{width: 220, height: 220, border: 2, borderColor: '#FDD05A'}}/>
        <div className="profile-info">
          <div className="profile-info__head">
            <h1 className="profile-info__fio h2">Глуховский Михаил Робертович</h1>
            <Link to={routes.main} className="profile-info__head-link p3">
              Перейти на основную страницу профиля
              <span><ArrowIcon></ArrowIcon></span>
            </Link>
          </div>
          <div className="profile-info__main">
            <p className="h4">E-mail:</p><p className="p1">jessica.hanson@example.com</p>
            <p className="h4">Телефон:</p><p className="p1">+7 (995) 345 56-34</p>
            <p className="h4">Факультет:</p><p className="p1">The Walt Disney Company</p>
            <p className="h4">Форма обучения:</p><p className="p1">магистр</p>
          </div>
        </div>
      </div>
  )
}