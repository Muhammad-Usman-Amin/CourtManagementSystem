import { FETCH_ALL_EMPLOYEE_DATA, CREATE, UPDATE, DELETE, QUERY, LIKE } from '../constants/actionTypes';
import * as api from '../api';

//Query for optional data
export const getQueryData = (params) => async (dispatch) => {
    try {
        const { data } = await api.fetchQueryData(params);
        dispatch({ type: QUERY, payload: data });
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

//     api.get('/api/data', {
//     params: {
//       id: 123,
//       type: 'example',
//       filter: 'someValue'
//     }
//   })

// Actions creators
export const getEmployeeData = () => async (dispatch) => {
    // console.log('getCases Called');
    // let datam = null;
    try {
        const { data } = await api.fetchEmployeeData();
        // console.log(data);
        dispatch({ type: FETCH_ALL_EMPLOYEE_DATA, payload: data });
        // datam = data;
    } catch (error) {
        console.log(error);
    }
    // console.log("Employee Data Action result:");
    // console.log(datam);
};
export const createEmployeeData = (employeeFile) => async (dispatch) => {
    // console.log(caseFile);
    try {
        const { data } = await api.createEmployeeData(employeeFile);
        dispatch({ type: CREATE, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const updateEmployeeData = (id, employeeFile) => async (dispatch) => {
    try {
        // console.log(id);
        const { data } = await api.updateEmployeeData(id, employeeFile);

        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const deleteEmployeeData = (id) => async (dispatch) => {
    try {
        await api.deleteEmployeeData(id);

        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error);
    }
}

export const likeCase = (id) => async (dispatch) => {
    try {
        const { data } = await api.likeEmployeeData(id);

        dispatch({ type: LIKE, payload: data });
    } catch (error) {
        console.log(error);
    }
}