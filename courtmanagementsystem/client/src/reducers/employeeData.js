import { FETCH_ALL_EMPLOYEE_DATA, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';

export default (employeeData = [], action) => {
    switch (action.type) {
        case DELETE:
            return employeeData.filter((employeeFile) => employeeFile._id !== action.payload);
        case UPDATE:
        case LIKE:
            return employeeData.map((employeeFile) => employeeFile._id === action.payload._id ? action.payload : employeeFile);
        case FETCH_ALL_EMPLOYEE_DATA:
            return action.payload;
        case CREATE:
            return [...employeeData, action.payload];
        default:
            return employeeData;
    }
}