import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';
import * as api from '../api';

// Actions creators
export const getCases = () => async (dispatch) => {
    // console.log('getCases Called');
    let datam = null;
    try {
        const { data } = await api.fetchCases();
        dispatch({ type: FETCH_ALL, payload: data });
        datam = data;
    } catch (error) {
        console.log(error);
    }
    // console.log("Cases Action result:");
    // console.log(datam);
};
export const createCase = (caseFile) => async (dispatch) => {
    // console.log(caseFile);
    try {
        const { data } = await api.createCase(caseFile);
        dispatch({ type: CREATE, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const updateCase = (id, caseFile) => async (dispatch) => {
    try {
        // console.log(id);
        const { data } = await api.updateCase(id, caseFile);

        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const deleteCase = (id) => async (dispatch) => {
    try {
        await api.deleteCase(id);

        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error);
    }
}

export const likeCase = (id) => async (dispatch) => {
    try {
        const { data } = await api.likeCase(id);

        dispatch({ type: LIKE, payload: data });
    } catch (error) {
        console.log(error);
    }
}