import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';

export default (cases = [], action) => {
    switch (action.type) {
        case DELETE:
            return cases.filter((caseFile) => caseFile._id !== action.payload);
        case UPDATE:
        case LIKE:
            return cases.map((caseFile) => caseFile._id === action.payload._id ? action.payload : caseFile);
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            return [...cases, action.payload];
        default:
            return cases;
    }
}