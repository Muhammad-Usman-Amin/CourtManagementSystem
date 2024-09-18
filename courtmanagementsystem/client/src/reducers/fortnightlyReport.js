import { FETCH_FORTNIGHTLY_REPORT } from '../constants/actionTypes';

export default (fortnightlyReport = [], action) => {
    switch (action.type) {
        case FETCH_FORTNIGHTLY_REPORT:
            return action.payload;
        default:
            return fortnightlyReport;
    }
}