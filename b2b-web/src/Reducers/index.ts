import { combineReducers } from 'redux';
import token from '../Reducers/Token/token';
import users from '../Reducers/User/user';
import companies from '../Reducers/Companies/companies';

export default combineReducers({ token, users, companies });