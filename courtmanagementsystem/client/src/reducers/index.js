import { combineReducers } from 'redux';
import posts from './posts';
import cases from './cases';
import employeeData from './employeeData';
import queryData from './queryData';
import causeLists from './causeLists';

export default combineReducers({ posts, cases, employeeData, queryData, causeLists });