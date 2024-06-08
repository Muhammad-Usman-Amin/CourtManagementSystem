import {
  FETCH_ALL_CAUSE_LIST,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
} from "../constants/actionTypes";

const initialState = {
  cases: [],
  serialNumbers: [],
  error: null,
};

// export default (causeLists = [], action) => {
export default (causeLists = initialState, action) => {
  switch (action.type) {
    // case DELETE:
    //   return causeLists.cases.filter((caseFile) => caseFile._id !== action.payload.cases);
    case DELETE:
      return {
        ...causeLists,
        cases: causeLists.cases.filter(
          (caseFile) => caseFile._id !== action.payload
        ),
      };

    // case UPDATE:
    // case LIKE:
    //   return causeLists.map((caseFile) =>
    //     caseFile._id === action.payload._id ? action.payload : caseFile
    //   );
    case UPDATE:
    case LIKE:
      return {
        ...causeLists,
        cases: causeLists.cases.map((caseFile) =>
          caseFile._id === action.payload._id ? action.payload : caseFile
        ),
      };
    // case FETCH_ALL_CAUSE_LIST:
    //     return action.payload;
    case FETCH_ALL_CAUSE_LIST:
      return {
        ...causeLists,
        cases: action.payload.cases,
        serialNumbers: action.payload.serialNumbers,
      };

    // case FETCH_CASES_FAILURE:
    //   return {
    //     ...state,
    //     error: action.payload,
    //   };

    // case CREATE:
    //   return [...causeLists, action.payload];
    case CREATE:
      return {
        ...causeLists,
        cases: [...causeLists.cases, action.payload],
      };
    default:
      return causeLists;
  }
};
