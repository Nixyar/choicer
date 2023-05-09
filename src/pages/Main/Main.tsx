import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Route, Routes, useNavigate} from 'react-router';
import {Header} from '../../components/Header/Header';
import {Sidebar} from '../../components/Sidebar/Sidebar';
import './Main.css';
import {routes} from '../../Root';
import {IStore} from '../../store';
import {CreateWork} from '../CreateWork/CreateWork';
import {Home} from '../Home/Home';
import {Profile} from '../Profile/Profile';
import {Works} from '../Works/Works';

export const Main = () => {
  const navigate = useNavigate();
  const user = useSelector((state: IStore) => state.user);

  useEffect(() => {
    if (user.firstname === '') navigate(routes.login);
  }, [])

  return (
      <div className="page">
        <Sidebar/>
        <main className="main">
          <Header/>
          <Routes>
            <Route path={routes.main} element={<Home/>}/>
            <Route path={routes.profile} element={<Profile/>}/>
            <Route path={routes.works} element={<Works/>}/>
            <Route path={routes.createWork} element={<CreateWork/>}/>
            <Route path={routes.other} element={<Home/>}/>
          </Routes>
        </main>
      </div>
  )
}