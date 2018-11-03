import { combineReducers } from 'redux';
import token from '../Reducers/Token/token';
import users from '../Reducers/User/user';

export default combineReducers({ token, users });