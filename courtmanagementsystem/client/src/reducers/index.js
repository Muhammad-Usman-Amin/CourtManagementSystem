import { combineReducers } from 'redux';
import posts from './posts';
import cases from './cases';
import employeeData from './employeeData';

export default combineReducers({ posts, cases, employeeData });