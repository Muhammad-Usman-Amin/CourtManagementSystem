// selectors/caseStatisticsSelector.js
export const selectPendingCases = (state) => state.casesStatistics.pendingCases;
export const selectCauseListCases = (state) => state.causeLists.cases;
export const serialNumbers = (state) => state.causeLists.serialNumbers;