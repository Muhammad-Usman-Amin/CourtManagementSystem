import { FETCH_DISPOSAL } from '../constants/actionTypes';

export default (disposalCases = [], action) => {
    switch (action.type) {
        case FETCH_DISPOSAL:
            return action.payload;
        default:
            return disposalCases;
    }
}