import { combineReducers } from 'redux';
import posts from './posts';
import cases from './cases';
import pendingCases from './pendingCases';
import employeeData from './employeeData';
import queryData from './queryData';
import causeLists from './causeLists';
import controlCenter from './controlCenter';

export default combineReducers({ posts, cases, pendingCases, employeeData, queryData, causeLists, controlCenter });