import UserEntity from '../../../../users/domain/entities/UserEntity';

export enum AuthActionTypes {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  GET_USER = 'GET_USER',
  UPDATE_USER = 'UPDATE_USER', // Añadido
}

// Acciones
const login = (user: UserEntity) => ({
  type: AuthActionTypes.LOGIN,
  payload: user,
});

const logout = () => ({
  type: AuthActionTypes.LOGOUT,
});

const getUser = () => ({
  type: AuthActionTypes.GET_USER,
});

const updateUser = (user: UserEntity) => ({
  type: AuthActionTypes.UPDATE_USER,
  payload: user,
});

export { login, logout, getUser, updateUser }; // Asegúrate de exportar updateUser
