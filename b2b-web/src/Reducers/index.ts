import { combineReducers } from 'redux';
import token from '../Reducers/Token/token';
import users from '../Reducers/User/user';
import companies from '../Reducers/Companies/companies';
import applicationForms from '../Reducers/ApplicationForms/applicationForms';

export default combineReducers({ token, users, companies, applicationForms });