import mongoose from "mongoose";

const poSchema = new mongoose.Schema({
  presidingOfficer: String,
  causeListName: String,
  designation: String,
  judgeCategory: String,
  courtNumber: String,
  stationDistrict: String,
  courtStatus: [],  //use for Regular, CPC, FamilyCourt etc
  monthlyData: [{
    statementMonth: Date,
    totalDays: String,
    totalSundays: String,
    leaves: String,
    otherHolidays: String,
    nonJudicialWorkingDays: String,
    noOfStrikesDays: String,
    netJudicialWorkingDays: String,
    incumbencyStatus: String,
    quartelrlyBacklogClearanceTarget: String,
  }]
});

const poData = mongoose.model("poFile", poSchema, "poData");

export default poData;
