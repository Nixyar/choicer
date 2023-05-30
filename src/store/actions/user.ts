import axios from 'axios/index';
import {getCookie, setCookie} from 'react-use-cookie';
import {LoginApi} from '../../api/login.api';
import {IUser} from '../../interfaces/user.interfaces';
import {store} from '../index';

export const actions = {
  SET_USER: 'SET_USER',
};

export const setUserName = (userInfo: IUser) => {
  return { type: actions.SET_USER, payload: userInfo }
}

const getToken = async (code: string) => {
  const body = {
    code: code
  };
  try {
    const response = await axios.post(LoginApi.GET_TOKEN, body);
    const expirationTimeInDays = Math.ceil(response.data.expires_in / (24 * 60 * 60));
    const thirtyDaysInMinutes = 30 * 24 * 60;
    setCookie('access_token', response.data.access_token, { days: expirationTimeInDays });
    setCookie('refresh_token', response.data.refresh_token, { days: thirtyDaysInMinutes });
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
}

const updateToken = async () => {
  const refresh_token = getCookie('refresh_token');

  const body = {
    refresh_token: refresh_token
  };

  try {
    const response = await axios.post(LoginApi.UPDATE_TOKEN, body);
    const expirationTimeInDays = Math.ceil(response.data.expires_in / (24 * 60 * 60));
    setCookie('access_token', response.data.access_token, { days: expirationTimeInDays });
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
}

const getUserInfo = async () => {
  try {
    const access_token = getCookie('access_token');
    const body = { access_token };
    const response = await axios.post(LoginApi.GET_USER, body);
    store.dispatch(setUserName(response.data))
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
}

export const init = async () => {
  const accessToken = getCookie('access_token');
  const refreshToken = getCookie('refresh_token');

  try {
    if (!accessToken && refreshToken) {
      await updateToken();
      await getUserInfo();
    } else {
      if (accessToken && accessToken !== 'undefined') {
        await getUserInfo();
      } else {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const code = urlSearchParams.get('code');

        if (code) {
          await getToken(code);
          await getUserInfo();
        }
      }
    }
  } catch (error) {
    return Promise.reject(error);
  }
}