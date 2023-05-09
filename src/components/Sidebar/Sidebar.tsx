import React, {useState} from 'react';
import {useNavigate} from 'react-router';
import {Link, useLocation} from 'react-router-dom';
import './Sidebar.css';
import {user} from '../../data/user';
import Logo from '../../img/logo(light).svg';
import LogoText from '../../img/text-logo(light).png';
import {store} from '../../store';
import {updateUserName} from '../../store/actions/user';
import {initialState} from '../../store/reducers/user';
import {ExitIcon} from '../icons/Exit';
import {HomeIcon} from '../icons/Home';
import {ProfileIcon} from '../icons/Profile';
import {WorksIcon} from '../icons/Works';
import {routes} from '../../Root';

export const Sidebar = () => {
  let location = useLocation();
  const navigate = useNavigate();
  const [isHover, setHover] = useState(false);

  const setClassNameForAsideNav = (path: string, isExit: boolean = false): string => {
    let classNames = 'aside__nav-link';
    if (location.pathname === path) classNames += ' active';
    if (isExit) classNames += ' p2';
    return classNames;
  }

  const setActiveLineHeight = (): string => {
    switch (location.pathname) {
      case routes.main:
        return '195px';
      case routes.profile:
        return '290px';
      case routes.works:
        return '385px';
      default:
        return '-100px';
    }
  }

  const onToggleHover = (isHover: boolean): void => {
    setHover(isHover);
  }

  const onLogout = () => {
    store.dispatch(updateUserName(initialState));
    navigate(routes.login);
  }

  return (
      <aside className="aside"
             onMouseEnter={() => onToggleHover(true)}
             onMouseLeave={() => onToggleHover(false)}>
        <div className="aside__line-active" style={{top: setActiveLineHeight()}}></div>
        <nav className="aside__nav p2">
          <div className="aside__nav-logo">
            <img src={Logo} alt="logo" className="aside__nav-logo-img"/>
            {isHover ? <img src={LogoText} alt="choicer."/> : null}
          </div>
          <Link to={routes.main} className={setClassNameForAsideNav(routes.main)}>
            <HomeIcon styles={'aside__nav-icon'}/> {isHover ? 'Главная' : null}
          </Link>
          <Link to={routes.profile} className={setClassNameForAsideNav(routes.profile)}>
            <ProfileIcon styles={'aside__nav-icon'}/> {isHover ? 'Профиль' : null}
          </Link>
          <Link to={routes.works} className={setClassNameForAsideNav(routes.works)}>
            <WorksIcon styles={'aside__nav-icon'}/> {isHover ? 'Работы' : null}
          </Link>
        </nav>
        <div className={setClassNameForAsideNav('', true)} onClick={onLogout}>
          <ExitIcon styles={'aside__nav-icon'}/> {isHover ? 'Выйти' : null}
        </div>
      </aside>
  )
}