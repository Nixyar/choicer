import {Avatar} from '@mui/material';
import React from 'react';
import './Profile.css';
import {useSelector} from 'react-redux';
import {ArrowIcon} from '../../components/icons/Arrow';
import {Link} from 'react-router-dom';
import {routes} from '../../Root';
import {IStore} from '../../store';

export const Profile = () => {
  const user = useSelector((state: IStore) => state.user);

  return (
      <div className="profile">
        <Avatar src={user.image} sx={{width: 220, height: 220, border: 2, borderColor: '#FDD05A'}}/>
        <div className="profile-info">
          <div className="profile-info__head">
            <h1 className="profile-info__fio h2">{`${user.first_name}${user.last_name}`}</h1>
            <Link to={routes.main} className="profile-info__head-link p3">
              Перейти на основную страницу профиля
              <span><ArrowIcon></ArrowIcon></span>
            </Link>
          </div>
          <div className="profile-info__main">
            <p className="h4">E-mail:</p><p className="p1">{user.email}</p>
            <p className="h4">Телефон:</p><p className="p1">{user.phone}</p>
            <p className="h4">Факультет:</p><p className="p1">{user.faculty}</p>
            <p className="h4">Форма обучения:</p><p className="p1">{user.formEducation}</p>
          </div>
        </div>
      </div>
  )
}