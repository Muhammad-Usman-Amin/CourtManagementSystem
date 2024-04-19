import mongoose from "mongoose";

const poSchema = new mongoose.Schema({
  presidingOfficer: String,
  causeListName: String,
  judgeCategory: String,
  courtNumber: String,
  stationDistrict: String,
  courtStatus: String,  //use for Regular, CPC, FamilyCourt etc
  monthlyData: {
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
  }
  
});

const poData = mongoose.model("poData", poSchema, "poData");

export default poData;
