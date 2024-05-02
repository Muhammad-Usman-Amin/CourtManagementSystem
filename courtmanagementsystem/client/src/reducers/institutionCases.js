import { FETCH_INSTITUTION } from '../constants/actionTypes';

export default (institutionCases = [], action) => {
    switch (action.type) {
        case FETCH_INSTITUTION:
            return action.payload;
        default:
            return institutionCases;
    }
}