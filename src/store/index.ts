import { configureStore } from '@reduxjs/toolkit';
import {IUser} from '../interfaces/user.interfaces';
import {userReducer} from './reducers/user';

export type IStore = {
  user: IUser;
};

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});