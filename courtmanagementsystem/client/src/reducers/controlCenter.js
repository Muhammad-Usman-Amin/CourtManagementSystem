import { FETCH_ALL_CONTROL_CENTER, UPDATE, DELETE, LIKE, CREATE_CONTROL_CENTER } from '../constants/actionTypes';

export default (controlCenter = null, action) => {
    switch (action.type) {
        case DELETE:
            return controlCenter.filter((caseFile) => caseFile._id !== action.payload);
        case UPDATE:
            return action.payload;
        case LIKE:
            return controlCenter.map((caseFile) => caseFile._id === action.payload._id ? action.payload : caseFile);
        case FETCH_ALL_CONTROL_CENTER:
            return action.payload;
        case CREATE_CONTROL_CENTER:
            return  action.payload;
            // return [...controlCenter, action.payload];
        default:
            return controlCenter;
    }
}