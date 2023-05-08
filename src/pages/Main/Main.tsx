import React from 'react';
import {Route, Routes} from 'react-router';
import {Header} from '../../components/Header/Header';
import {Sidebar} from '../../components/Sidebar/Sidebar';
import './Main.css';
import {routes} from '../../Root';
import {CreateWork} from '../CreateWork/CreateWork';
import {Home} from '../Home/Home';
import {Profile} from '../Profile/Profile';
import {Works} from '../Works/Works';

export const Main = () => {
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
          </Routes>
        </main>
      </div>
  )
}