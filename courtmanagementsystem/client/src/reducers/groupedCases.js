import { FETCH_GROUPED_CASES } from '../constants/actionTypes';

export default (groupedCases = [], action) => {
    switch (action.type) {
        case FETCH_GROUPED_CASES:
            return action.payload;
        default:
            return groupedCases;
    }
}