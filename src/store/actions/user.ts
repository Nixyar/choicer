import {IUser} from '../../interfaces/user.interfaces';

export const updateUserName = (userInfo: IUser) => {
  return { type: 'SET_USER', payload: userInfo }
}