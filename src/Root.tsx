import React from 'react'
import {Route, Routes} from 'react-router';
import {CreateWork} from './pages/CreateWork/CreateWork';
import {Login} from './pages/Login/Login';
import {Main} from './pages/Main/Main';
import {Profile} from './pages/Profile/Profile';
import {Works} from './pages/Works/Works';

export const routes = {
  main: '/',
  login: '/login',
  profile: '/profile',
  works: '/works',
  createWork: '/create-work',
};

export const Root = () => {
  return (
      <Routes>
        <Route path={routes.login} element={<Login/>}></Route>
        <Route path={routes.main} element={<Main/>}>
          <Route path={routes.profile} element={<Profile/>}/>
          <Route path={routes.works} element={<Works/>}/>
          <Route path={routes.createWork} element={<CreateWork/>}/>
        </Route>
      </Routes>
  );
}
