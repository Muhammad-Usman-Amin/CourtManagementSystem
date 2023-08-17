import mongoose from "mongoose";

const caseSchema = new mongoose.Schema({
  // "Case Title": String,
  // "Case No": String,
  // "Case Type": String,
  // "Category Per PQS": String,
  // "FIR NO": String, "FIR Date": Date, underSection: String, policeStation: String,
  // "Date of Institution ": Date,
  // "Date of Disposal": Date,
  // isTransferedIn: Boolean, "Date of Transfer In": Date,
  ["Case Title"]: String,
  urduTitle: String,
  ["Case No"]: String,
  ["Case Type"]: String,
  ["Category Per PQS"]: String,
  ["FIR NO"]: String,
  ["FIR Date"]: Date,
  Thana: String,
  Section: String,
  ["Date of Institution "]: Date,
  ["Date of Disposal Transfer Out"]: Date,
  disposed: Boolean,
  transferedOut: Boolean,
  transferedIn: Boolean,
  // ["Disposal OR Transfer Out Flag"]: String, // this is the converted to disposed and transferOut key
  ["Disposal Mode Flag"]: String, //used for contested, non-contested etc
  AcquittalORConvictionFlag: String, //only for Criminal cases
  ["Date of Transfer In"]: Date,
  ["Date of Other Institution"]: Date,
  ["Institution Flag"]: String, //used for restored, remanded flags

  orderNumber: String,
  nextDate: Date,
  actionAbstract: String,
  orderDate: { type: Date, default: new Date() },
  causeListEntries: [
    {
      orderNumber: String,
      orderDate: { type: Date, default: new Date() },
      nextDate: Date,
      actionAbstract: String,
    },
  ],
  causeListDates: [Date],
  likeCount: {
    type: Number,
    default: 0,
  },
});

// {
// title: String,
// caseNumber: String,
// caseType: String,
// caseSubType: String,
// FIR: {
//     type: Number,
//     default: null
// },
// FIRdate: {
//     type: Date,
//     default: null
// },
// underSection: {
//     type: String,
//     default: null
// },
// policeStation: String,
// institutionDate: {
//     type: Date,
//     default: new Date()
// },
// disposalDate: Date,
// isTranferedIn: Boolean,
// transferedInDate: Date,
// likeCount: {
//     type: Number,
//     default: 0
// }
// });

const Case = mongoose.model("Case", caseSchema, "cases");

export default Case;
