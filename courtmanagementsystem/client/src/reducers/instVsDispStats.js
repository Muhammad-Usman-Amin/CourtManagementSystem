import { FETCH_INST_VS_DISP_STATS } from '../constants/actionTypes';

export default (instVsDispStats = [], action) => {
    switch (action.type) {
        case FETCH_INST_VS_DISP_STATS:
            return action.payload;
        default:
            return instVsDispStats;
    }
}