import UserEntity from '../../../../users/domain/entities/UserEntity';
import { AuthActionTypes } from '../actions/authActions';

interface AuthState {
  isLoggedIn: boolean;
  user?: UserEntity;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
};

export const authReducer = (
  state = initialState,
  action: {type: AuthActionTypes; payload?: UserEntity | null},
): AuthState => {
  switch (action.type) {
    case AuthActionTypes.LOGIN:
      return {
        isLoggedIn: true,
        user: action.payload,
      };
    case AuthActionTypes.LOGOUT:
      return {
        isLoggedIn: false,
        user: null,
      };
    case AuthActionTypes.GET_USER:
      return state;
    case AuthActionTypes.UPDATE_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export const selectIsLoggedIn = (state: {auth: AuthState}) => state.auth.isLoggedIn;
export const selectUser = (state: {auth: AuthState}) => state.auth.user;
