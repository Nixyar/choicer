import React, {useEffect} from 'react'
import {Provider} from 'react-redux';
import {Route, Routes} from 'react-router';
import {CreateWork} from './pages/CreateWork/CreateWork';
import {Login} from './pages/Login/Login';
import {Main} from './pages/Main/Main';
import {Profile} from './pages/Profile/Profile';
import {Works} from './pages/Works/Works';
import {store} from './store';
import {init} from './store/actions/user';

export const routes = {
  main: '/',
  login: '/login',
  profile: '/profile',
  works: '/works',
  createWork: '/create-work',
  other: '/*',
};

export const Root = () => {
  useEffect(() => {
    init().then(console.log);
  }, []);

  return (
      <Provider store={store}>
        <Routes>
          <Route path={routes.login} element={<Login/>}/>
          <Route path={routes.main} element={<Main/>}>
            <Route path={routes.profile} element={<Profile/>}/>
            <Route path={routes.works} element={<Works/>}/>
            <Route path={routes.createWork} element={<CreateWork/>}/>
          </Route>
          <Route path={routes.other} element={<Login/>}/>
        </Routes>
      </Provider>
  );
}
