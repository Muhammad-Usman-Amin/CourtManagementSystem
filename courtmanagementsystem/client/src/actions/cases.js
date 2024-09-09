import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
  FETCH_PENDING,
  FETCH_INSTITUTION,
  FETCH_DISPOSAL,
  FETCH_CASES_STATISTICS,
  FETCH_INSTITUTIONS_STATISTICS,
  FETCH_GROUPED_CASES,
  FETCH_INST_VS_DISP_STATS,
} from "../constants/actionTypes";
import * as api from "../api";

// Actions creators
export const getCases = (params) => async (dispatch) => {
  // console.log('getCases Called');
  // let datam = null;
  // console.log(getQuery);
  try {
    const { data } = await api.fetchCases(params);
    dispatch({ type: FETCH_ALL, payload: data });
    // datam = data;
  } catch (error) {
    console.log(error);
  }
  // console.log("Cases Action result:");
  // console.log(datam);
};

export const getPendingCases = (params) => async (dispatch) => {
  // console.log('getCases Called');
  // let datam = null;
  // console.log(getQuery);
  try {
    const { data } = await api.fetchCases(params);
    dispatch({ type: FETCH_PENDING, payload: data });
    // datam = data;
  } catch (error) {
    console.log(error);
  }
  // console.log("Cases Action result:");
  // console.log(datam);
};
export const getGroupedCases = (params) => async (dispatch) => {
  try {
    const { data } = await api.fetchCases(params);
    dispatch({ type: FETCH_GROUPED_CASES, payload: data });
    // datam = data;
  } catch (error) {
    console.log(error);
  }
  // console.log("Cases Action result:");
  // console.log(datam);
};
export const getInstitutionCases = (params) => async (dispatch) => {
  // console.log('getCases Called');
  // let datam = null;
  // console.log(getQuery);
  try {
    const { data } = await api.fetchCases(params);
    dispatch({ type: FETCH_INSTITUTION, payload: data });
    // datam = data;
  } catch (error) {
    console.log(error);
  }
  // console.log("Cases Action result:");
  // console.log(datam);
};
export const getCasesStatistics = (params) => async (dispatch) => {
  // console.log('getCases Called');
  // let datam = null;
  // console.log(getQuery);
  try {
    const { data } = await api.fetchCases(params);
    dispatch({ type: FETCH_CASES_STATISTICS, payload: data });
    // datam = data;
  } catch (error) {
    console.log(error);
  }
  // console.log("Cases Action result:");
  // console.log(datam);
};
export const getInstVsDispStats = (params) => async (dispatch) => {
  // console.log('getInstVsDispStats Called');
  // let datam = null;
  // console.log(getQuery);
  try {
    const { data } = await api.fetchCases(params);
    dispatch({ type: FETCH_INST_VS_DISP_STATS, payload: data });
    // datam = data;
  } catch (error) {
    console.log(error);
  }
  // console.log("Cases Action result:");
  // console.log(datam);
};
export const getInstitutionsStatistics = (params) => async (dispatch) => {
  // console.log('getCases Called');
  // let datam = null;
  // console.log(getQuery);
  try {
    const { data } = await api.fetchCases(params);
    dispatch({ type: FETCH_INSTITUTIONS_STATISTICS, payload: data });
    // datam = data;
  } catch (error) {
    console.log(error);
  }
  // console.log("Cases Action result:");
  // console.log(datam);
};
export const getDisposalCases = (params) => async (dispatch) => {
  // console.log('getCases Called');
  // let datam = null;
  // console.log(getQuery);
  try {
    const { data } = await api.fetchCases(params);
    dispatch({ type: FETCH_DISPOSAL, payload: data });
    // datam = data;
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
};

export const likeCase = (id) => async (dispatch) => {
  try {
    const { data } = await api.likeCase(id);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
