import { FETCH_INSTITUTIONS_STATISTICS } from '../constants/actionTypes';

export default (institutionsStatistics = [], action) => {
    switch (action.type) {
        case FETCH_INSTITUTIONS_STATISTICS:
            return action.payload;
        default:
            return institutionsStatistics;
    }
}