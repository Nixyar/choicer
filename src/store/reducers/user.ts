import {IUser} from '../../interfaces/user.interfaces';

export const initialState: IUser = {
  firstname: '',
  middlename: '',
  lastname: '',
  email: '',
  phone: '',
  faculty: '',
  formEducation: '',
  role: '',
  photo: '',
};

export const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, ...action.payload};
    default:
      return state;
  }
};