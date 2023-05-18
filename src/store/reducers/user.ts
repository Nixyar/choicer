import {IUser} from '../../interfaces/user.interfaces';

export const initialState: IUser = {
  birthday: '',
  client_id: '',
  email: '',
  first_name: '',
  gender: '',
  id: '',
  image: '',
  last_name: '',
  name: '',
  nickname: '',
  role: '',
  phone: '',
  faculty: '',
  formEducation: ''

};

export const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, ...action.payload};
    default:
      return state;
  }
};