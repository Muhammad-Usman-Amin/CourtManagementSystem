import { combineReducers } from 'redux';
import posts from './posts';
import cases from './cases';

export default combineReducers({ posts, cases });