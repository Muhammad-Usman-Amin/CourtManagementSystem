import { FETCH_CASES_STATISTICS } from '../constants/actionTypes';

export default (casesStatistics = [], action) => {
    switch (action.type) {
        case FETCH_CASES_STATISTICS:
            return action.payload;
        default:
            return casesStatistics;
    }
}