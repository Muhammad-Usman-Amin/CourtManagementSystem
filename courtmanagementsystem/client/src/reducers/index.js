import { combineReducers } from "redux";
import posts from "./posts";
import cases from "./cases";
import pendingCases from "./pendingCases";
import institutionCases from "./institutionCases";
import disposalCases from "./disposalCases";
import employeeData from "./employeeData";
import queryData from "./queryData";
import causeLists from "./causeLists";
import rangeCauseLists from "./rangeCauseLists";
import controlCenter from "./controlCenter";

export default combineReducers({
  posts,
  cases,
  pendingCases,
  institutionCases,
  disposalCases,
  employeeData,
  queryData,
  causeLists,
  rangeCauseLists,
  controlCenter,
});
