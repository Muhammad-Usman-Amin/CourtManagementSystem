// import { FETCH_ALL_EMPLOYEE_DATA, QUERY, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';
import { QUERY } from '../constants/actionTypes';

export default (queryData = [], action) => {
    switch (action.type) {
        // case DELETE:
        //     return employeeData.filter((employeeFile) => employeeFile._id !== action.payload);
        // case UPDATE:
        // case LIKE:
        //     return employeeData.map((employeeFile) => employeeFile._id === action.payload._id ? action.payload : employeeFile);
        // case FETCH_ALL_EMPLOYEE_DATA:
        //     return action.payload;
        case QUERY:
            return action.payload;
        // case CREATE:
        //     return [...employeeData, action.payload];
        default:
            return queryData;
    }
}