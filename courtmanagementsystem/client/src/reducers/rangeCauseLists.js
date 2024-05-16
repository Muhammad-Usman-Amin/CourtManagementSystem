import { FETCH_RANGE_CAUSE_LIST, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';

export default (rangeCauseLists = [], action) => {
    switch (action.type) {
        case DELETE:
            return rangeCauseLists.filter((caseFile) => caseFile._id !== action.payload);
        case UPDATE:
        case LIKE:
            return rangeCauseLists.map((caseFile) => caseFile._id === action.payload._id ? action.payload : caseFile);
        case FETCH_RANGE_CAUSE_LIST:
            return action.payload;
        case CREATE:
            return [...rangeCauseLists, action.payload];
        default:
            return rangeCauseLists;
    }
}