import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';
import * as api from '../api';

// Actions creators
export const getEmployeeData = () => async (dispatch) => {
    // console.log('getCases Called');
    try {
        const { data } = await api.fetchEmployeeData();
        // console.log(data);
        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        console.log(error);
    }
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

export const deleteCase = (id) => async (dispatch) => {
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