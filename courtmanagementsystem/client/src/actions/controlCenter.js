import { FETCH_ALL_CONTROL_CENTER, CREATE_CONTROL_CENTER, UPDATE, DELETE, LIKE } from '../constants/actionTypes';
import * as api from '../api';

// Actions creators
export const getControlCenter = () => async (dispatch) => {
    // console.log('getCases Called');
    let datam = null;
    try {
        const { data } = await api.fetchControlCenter();
        dispatch({ type: FETCH_ALL_CONTROL_CENTER, payload: data });
        datam = data;
    } catch (error) {
        console.log(error);
    }
    // console.log("Cases Action result:");
    console.log(datam);
};
export const createControlCenter = (caseFile) => async (dispatch) => {
    // console.log(caseFile);
    try {
        const { data } = await api.createControlCenter(caseFile);
        dispatch({ type: CREATE_CONTROL_CENTER, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const updateControlCenter = (id, caseFile) => async (dispatch) => {
    try {
        // console.log(id);
        const { data } = await api.updateCase(id, caseFile);

        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const deleteControlCenter = (id) => async (dispatch) => {
    try {
        await api.deleteCase(id);

        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error);
    }
}

export const likeControlCenter = (id) => async (dispatch) => {
    try {
        const { data } = await api.likeCase(id);

        dispatch({ type: LIKE, payload: data });
    } catch (error) {
        console.log(error);
    }
}