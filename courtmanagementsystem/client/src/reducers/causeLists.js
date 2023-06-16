import { FETCH_ALL_CAUSE_LIST, FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';

export default (causeLists = [], action) => {
    switch (action.type) {
        case DELETE:
            return causeLists.filter((caseFile) => caseFile._id !== action.payload);
        case UPDATE:
        case LIKE:
            return causeLists.map((caseFile) => caseFile._id === action.payload._id ? action.payload : caseFile);
        case FETCH_ALL_CAUSE_LIST:
            return action.payload;
        case CREATE:
            return [...causeLists, action.payload];
        default:
            return causeLists;
    }
}