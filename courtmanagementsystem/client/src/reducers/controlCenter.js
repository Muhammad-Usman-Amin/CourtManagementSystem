import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, CREATE_CONTROL_CENTER } from '../constants/actionTypes';

export default (controlCenter = [], action) => {
    switch (action.type) {
        case DELETE:
            return controlCenter.filter((caseFile) => caseFile._id !== action.payload);
        case UPDATE:
        case LIKE:
            return controlCenter.map((caseFile) => caseFile._id === action.payload._id ? action.payload : caseFile);
        case FETCH_ALL:
            return action.payload;
        case CREATE_CONTROL_CENTER:
            return [...controlCenter, action.payload];
        default:
            return controlCenter;
    }
}