import { FETCH_PENDING } from '../constants/actionTypes';

export default (pendingCases = [], action) => {
    switch (action.type) {
        case FETCH_PENDING:
            return action.payload;
        default:
            return pendingCases;
    }
}