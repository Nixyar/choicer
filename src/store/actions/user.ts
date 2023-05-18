import {IUser} from '../../interfaces/user.interfaces';

export const actions = {
  SET_USER: 'SET_USER',
};

export const setUserName = (userInfo: IUser) => {
  return { type: actions.SET_USER, payload: userInfo }
}