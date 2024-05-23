import mongoose from "mongoose";
import Case from "../models/case.js";
import express from "express";

const router = express.Router();

export const getCases = async (req, res) => {
  const query = req.query;

  try {
    // console.log(query);
    let cases;
    if (query.reqQuery === "All") {
      cases = await Case.find().sort({ ["Date of Institution "]: 1 });
    }

    if (query.reqQuery === "PendingCases") {
      const datePend = new Date(query.datePendency);
      // Extract year and month
      const monthPend = datePend.getMonth() + 1; // Months are zero-indexed (January is 0)
      const yearPend = datePend.getFullYear();
      // console.log(query.reqQuery);
      // console.log(monthPend + " - " + yearPend);

      // cases = await Case.find({
      //   $and: [
      //     { disposed: { $ne: true } }, //$ne means not equal to
      //     {
      //       "Disposal OR Transfer Out Flag": {
      //         $nin: ["Disposed", "Transfer Out"],
      //       },
      //     }, //$nin means not in array
      //   ],
      // }).sort({ ["Date of Institution "]: 1 });

      cases = await Case.find({
        $and: [
          { disposed: { $ne: true } },
          {
            "Disposal OR Transfer Out Flag": {
              $nin: ["Disposed", "Transfer Out"],
            },
          },
          // Add condition to filter by date
          {
            "Date of Institution ": {
              $lte: new Date(yearPend, monthPend - 1, 31), // Set the day to the last day of the month to cover the entire month
            },
          },
        ],
      }).sort({ ["Date of Institution "]: 1 });
    }

    // if(query.reqQuery === "InstituionsStatistics"){
    if(query.reqQuery === "InstitutionsStatistics"){

      const result = await Case.aggregate([
        {
          $project: {
            dates: [
              { date: '$Date of Institution ' },
              { date: '$Date of Transfer In' },
              { date: '$Date of Other Institution' }
            ],
            disposalFlag: '$Disposal OR Transfer Out Flag'  //for pendency of each month
          }
        },
        { $unwind: '$dates' },
        {
          $match: {
            'dates.date': { $ne: null },  // Ensure the date is not null
            disposalFlag: { $nin: ["Disposed", "Transfer Out"] }  // Exclude specified values
          }
        },
        {
          $group: {
            _id: {
              year: { $year: '$dates.date' },
              month: { $month: '$dates.date' }
            },
            count: { $sum: 1 }
          }
        },
        {
          $project: {
            _id: 0,
            month: '$_id.month',
            year: '$_id.year',
            count: 1
          }
        },
        {
          $sort: { year: 1, month: 1 }
        }
      ]);
  
      // Transform the result to the desired format
      const formattedResult = result.map(item => {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const formattedDate = `${monthNames[item.month - 1]}-${item.year}`;
        return {
          date: formattedDate, // e.g., "May-2024"
          cases: item.count
        };
      });

      // console.log(formattedResult);
      res.status(200).json(formattedResult);
        return;
    }

    // if (query.reqQuery === "CaseStatistics") {
    //   const datePend = new Date();
    //   const monthPend = datePend.getMonth() + 1; // Months are zero-indexed (January is 0)
    //   const yearPend = datePend.getFullYear();

    //   cases = await Case.find({
    //     $and: [
    //       { disposed: { $ne: true } },
    //       {
    //         "Disposal OR Transfer Out Flag": {
    //           $nin: ["Disposed", "Transfer Out"],
    //         },
    //       },
    //       // Add condition to filter by date
    //       {
    //         "Date of Institution ": {
    //           $lte: new Date(yearPend, monthPend - 1, 31), // Set the day to the last day of the month to cover the entire month
    //         },
    //       },
    //     ],
    //   }).sort({ ["Category Per PQS"]: 1 });

    //   let results = [];
    //   // let stats = {suits: 0, familyCases: 0, applications: 0,}
    //   let suits = 0;
    //   let familyCases = 0;
    //   let applications = 0;
    //   let custodyOfMiners = 0;
    //   let executions = 0;
    //   let rentCases = 0;
    //   let objectionPetitions = 0;

    //   if (cases.length !== 0) {
    //     cases.filter((item) => {
    //       suits +=
    //         item["Category Per PQS"] ===
    //         "Civil-001-Civil Suits (Original Jurisdiction)"
    //           ? 1
    //           : 0;
    //       suits += item["Category Per PQS"] === "Civil-002-Civil Suit" ? 1 : 0;
    //       familyCases +=
    //         item["Category Per PQS"] === "Civil-006-Family Court Cases" ? 1 : 0;
    //         applications +=
    //         item["Category Per PQS"] ===
    //         "Civil-018-Other Civil Misc Applications"
    //         ? 1
    //         : 0;
    //         custodyOfMiners +=
    //         item["Category Per PQS"] === "Civil-004-Custody of Minors" ? 1 : 0;
    //         executions +=
    //         item["Category Per PQS"] === "Civil-015-Execution Petitions"
    //         ? 1
    //         : 0;
    //         objectionPetitions +=
    //         item["Category Per PQS"] === "Civil-021-Objection Petitions"
    //         ? 1
    //         : 0;
    //         rentCases +=
    //           item["Category Per PQS"] === "Civil-026-Rent Appeals" ? 1 : 0;
    //     });

    //     // cases.forEach((file) => {
    //     //   // Calculate attendance for each file
    //     //   suits +=
    //     //     file?.["Category Per PQS"] ===
    //     //     "Civil-001-Civil Suits (Original Jurisdiction)"
    //     //       ? 1
    //     //       : 0;
    //     //   familyCases += file?.actionAbstract.includes("شہادت") ? 1 : 0;
    //     //   applications += file?.actionAbstract.includes("بحث") ? 1 : 0;
    //     //   custodyOfMiners += file?.actionAbstract.includes("حکم") ? 1 : 0;
    //     //   executions += file?.actionAbstract.includes("حکم بر مقدمہ") ? 1 : 0;
    //     //   rentCases += file?.actionAbstract.includes("حکم بر درخواست") ? 1 : 0;
    //     // });

    //     results.push({pendingCases:[
    //       {name: "Suits", cases: suits},
    //       {name: "Family Cases", cases: familyCases},
    //       {name: "Applications", cases: applications},
    //       {name: "Custody Of Miners", cases: custodyOfMiners},
    //       {name: "Executions", cases: executions},
    //       {name: "Objection Petitions", cases: objectionPetitions},
    //       {name:"Rent Cases", cases: rentCases},
    //     ]});
    //     // console.log(results);
    //     res.status(200).json(results);
    //     return;
    //   }
    // }

    if (query.reqQuery === "CaseStatistics") {
      const datePend = new Date();
      const monthPend = datePend.getMonth() + 1; // Months are zero-indexed (January is 0)
      const yearPend = datePend.getFullYear();
    
      // Fetch distinct categories from the database
      const distinctCategories = await Case.distinct("Category Per PQS", {
        $and: [
          { disposed: { $ne: true } },
          {
            "Disposal OR Transfer Out Flag": {
              $nin: ["Disposed", "Transfer Out"],
            },
          },
          // Add condition to filter by date
          {
            "Date of Institution ": {
              $lte: new Date(yearPend, monthPend - 1, 31), // Set the day to the last day of the month to cover the entire month
            },
          },
        ],
      });
    
      // Initialize a count object for each category
      const categoryCounts = distinctCategories.reduce((acc, category) => {
        acc[category] = 0;
        return acc;
      }, {});
    
      // Fetch all relevant cases
      const cases = await Case.find({
        $and: [
          { disposed: { $ne: true } },
          {
            "Disposal OR Transfer Out Flag": {
              $nin: ["Disposed", "Transfer Out"],
            },
          },
          // Add condition to filter by date
          {
            "Date of Institution ": {
              $lte: new Date(yearPend, monthPend - 1, 31), // Set the day to the last day of the month to cover the entire month
            },
          },
        ],
      }).sort({ ["Category Per PQS"]: 1 });
    
      // Count the number of cases for each category
      cases.forEach((item) => {
        if (categoryCounts.hasOwnProperty(item["Category Per PQS"])) {
          categoryCounts[item["Category Per PQS"]]++;
        }
      });
    
      // Prepare results in the desired format
      const results = Object.keys(categoryCounts).map((category) => ({
        name: category.replace(/^[A-Za-z]+-\d+-/, ''),
        cases: categoryCounts[category],
      })).sort((a, b) => b.cases - a.cases); //for sorting
      // console.log(results);
      res.status(200).json({ pendingCases: results });
      return;
    }

    

    // }
    // if (query.reqQuery === "InstitutionCases") {
    //   cases = await Case.find({
    //     $and: [
    //       { disposed: { $ne: true } }, //$ne means not equal to
    //       {
    //         "Disposal OR Transfer Out Flag": {
    //           $nin: ["Disposed", "Transfer Out"],
    //         },
    //       }, //$nin means not in array
    //     ],
    //   }).sort({ ["Date of Institution "]: -1 });
    // }

    if (query.reqQuery === "DisposalCases") {
      const dateDisp = new Date(query.dateDisposal);
      // Extract year and month
      const monthDisp = dateDisp.getMonth() + 1; // Months are zero-indexed (January is 0)
      const yearDisp = dateDisp.getFullYear();
      // console.log(query);
      cases = await Case.find({
        // $and: [
        // disposed: true,
        $expr: {
          $and: [
            { $eq: [{ $month: "$Date of Disposal Transfer Out" }, monthDisp] },
            { $eq: [{ $year: "$Date of Disposal Transfer Out" }, yearDisp] },
            // {$eq: ["$Disposal OR Transfer Out Flag", "Disposed"]}, // for disposals only
          ],
        },
        // "Disposal OR Transfer Out Flag": {
        //   $in: ["Disposed", "Transfer Out"],
        // },
        //upper and below both method works
        // $or: [
        //   { "Disposal OR Transfer Out Flag": "Disposed" },
        //   { "Disposal OR Transfer Out Flag": "Transfer Out" }
        // ],
        // ],
      }).sort({ ["Date of Institution "]: 1 });
      // }
    }
    // console.log(query);

    if (query.reqQuery === "InstitutionCases") {
      const dateObj = new Date(query.dateInstitution);
      // Extract year and month
      const month = dateObj.getMonth() + 1; // Months are zero-indexed (January is 0)
      const year = dateObj.getFullYear();

      const selectedMonth = month; // Assuming the user selects April (Month 4)
      const selectedYear = year; // Assuming the user selects the year 2024
      cases = await Case.aggregate([
        {
          $match: {
            $or: [
              {
                $expr: {
                  $and: [
                    {
                      $eq: [{ $month: "$Date of Institution " }, selectedMonth],
                    },
                    { $eq: [{ $year: "$Date of Institution " }, selectedYear] },
                  ],
                },
              },
              {
                $expr: {
                  $and: [
                    {
                      $eq: [{ $month: "$Date of Transfer In" }, selectedMonth],
                    },
                    { $eq: [{ $year: "$Date of Transfer In" }, selectedYear] },
                  ],
                },
              },
              {
                $expr: {
                  $and: [
                    {
                      $eq: [
                        { $month: "$Date of Other Institution" },
                        selectedMonth,
                      ],
                    },
                    {
                      $eq: [
                        { $year: "$Date of Other Institution" },
                        selectedYear,
                      ],
                    },
                  ],
                },
              },
            ],
          },
        },
      ]).sort({ ["Date of Institution "]: 1 });
    }

    res.status(200).json(cases);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createCase = async (req, res) => {
  // const { title, caseNumber, caseType, caseSubType, FIR, FIRdate, UnderSection, policeStation, institutionDate, disposalDate, isTransferedIn } = req.body;
  // const newCase = new Case({ title, caseNumber, caseType, caseSubType, FIR, FIRdate, UnderSection, policeStation, institutionDate, disposalDate, isTransferedIn });

  const { body } = req;
  // console.log(body);
  const {
    ["Case Title"]: caseTitle,
    urduTitle: urduTitle,
    ["Case No"]: caseNo,
    ["Case Type"]: caseType,
    ["Category Per PQS"]: categoryPerPQS,
    ["FIR NO"]: FIRNO,
    ["FIR Date"]: FIRDate,
    Thana,
    Section,
    ["Date of Institution "]: dateOfInstitution,
    ["Date of Disposal Transfer Out"]: dateOfDisposalTransferOut,
    ["Disposal OR Transfer Out Flag"]: disposalOrTransferOutFlag,
    ["Disposal Mode Flag"]: disposalModeFlaq,
    ["Date of Transfer In"]: dateOfTransferIn,
    ["Date of Other Institution"]: dateOfOtherInstitution,
    ["Institution Flag"]: institutionFlag,
    nextDate: nextDate,
    actionAbstract: actionAbstract,
    orderDate: orderDate,
    orderNumber,
    nature,
    isOtherNature,
    AcquittalORConviction,
  } = body;
  // console.log(caseTitle);

  const newCase = new Case({
    ["Case Title"]: caseTitle,
    urduTitle: urduTitle,
    ["Case No"]: caseNo,
    ["Case Type"]: caseType,
    ["Category Per PQS"]: categoryPerPQS,
    ["FIR NO"]: FIRNO,
    ["FIR Date"]: FIRDate,
    Thana,
    Section,
    ["Date of Institution "]: dateOfInstitution,
    ["Date of Disposal Transfer Out"]: dateOfDisposalTransferOut,
    ["Disposal OR Transfer Out Flag"]: disposalOrTransferOutFlag,
    ["Disposal Mode Flag"]: disposalModeFlaq,
    ["Date of Transfer In"]: dateOfTransferIn,
    ["Date of Other Institution"]: dateOfOtherInstitution,
    ["Institution Flag"]: institutionFlag,
    causeListEntries: [
      {
        orderNumber: orderNumber,
        orderDate: orderDate,
        nextDate: nextDate,
        actionAbstract: actionAbstract,
      },
    ],
    nextDate: nextDate,
    actionAbstract: actionAbstract,
    orderDate: orderDate,
    orderNumber: orderNumber,
    nature: nature,
    isOtherNature: isOtherNature,
    AcquittalORConviction: AcquittalORConviction,
  });

  //   newCase.causeListEntries = [
  //     {
  //       orderNumber: orderNumber,
  //       orderDate: orderDate,
  //       actionAbstract: actionAbstract,
  //       orderDate: orderDate,
  //     },
  //   ];

  try {
    await newCase.save();
    res.status(201).json(newCase);
  } catch (error) {
    res.status(409).json({ error });
  }
};

export const updateCase = async (req, res) => {
  const { id } = req.params;
  const caseFile = req.body; // for case data updating usage
  // console.log(caseFile);

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that ID");

  const { orderDate, orderNumber, nextDate, actionAbstract } = req.body; //for causeList usage
  // console.log(new Date().toISOString().split("T")[0]);
  //console.log(orderDate); // prints 2024-04-28T04:20:00.000Z
  //console.log(new Date(orderDate).toISOString().split("T")[0]); // prints 2024-04-28
  const theCase = await Case.findById(id);
  let updatedCase = null;

  // const caseFileData = await Case.findById(id);

  // console.log("title received" + caseFile["Case Title"]);

  // Get the current case's cause List entries and last entry in the array
  const causeListEntries = theCase.causeListEntries.toObject();
  const causeListDates = theCase.causeListDates.toObject();
  // console.log("causeListEntries: ");
  // console.log(causeListEntries);
  const lastCauseListEntry = causeListEntries[causeListEntries.length - 1];
  // console.log("lastCauseListEntry: ");
  // console.log(lastCauseListEntry);

  if (caseFile["Case Title"] || caseFile["Case Title"] === "") {
    // console.log("Title if executed");
    if (
      theCase.causeListEntries.length > 0 &&
      new Date(orderDate).toDateString() ===
        new Date(theCase.orderDate).toDateString()
    ) {
      causeListEntries[causeListEntries.length - 1] = {
        orderNumber: orderNumber,
        orderDate: orderDate,
        nextDate: nextDate,
        actionAbstract: actionAbstract,
      };
      causeListDates[causeListDates.length - 1] = orderDate;
    } else {
      causeListDates.push(orderDate);
      causeListEntries.push({
        orderNumber: orderNumber,
        orderDate: orderDate,
        nextDate: nextDate,
        actionAbstract: actionAbstract,
      });
    }
    updatedCase = await Case.findByIdAndUpdate(
      id,
      {
        ...caseFile,
        causeListEntries: causeListEntries,
        causeListDates: causeListDates,
        orderNumber: orderNumber,
        orderDate: orderDate,
        nextDate: nextDate,
        actionAbstract: actionAbstract,
      },
      { new: true }
    );
    return res.json(updatedCase);
  }

  // console.log(new Date().toDateString);
  // console.log(new Date(theCase.orderDate).toDateString());
  // console.log(
  //   new Date(theCase.orderDate).toDateString() === new Date().toDateString()
  // );
  // return;
  //if the order date is the same as today then REPLACE the required entries
  //in the array at last position using the $set operator

  // console.log(new Date(theCase.orderDate).toDateString());
  // console.log(new Date().toDateString());
  // console.log(new Date(lastCauseListEntry.orderDate).toDateString());
  // console.log(
  //   theCase.causeListEntries.length > 1 &&
  //     (new Date().toDateString() ===
  //       new Date(theCase.orderDate).toDateString() ||
  //       new Date(lastCauseListEntry.orderDate).toDateString() ===
  //         new Date(theCase.orderDate).toDateString())
  // );
  // (console.log(theCase.causeListEntries.length > 1) &&
  //   new Date().toDateString() === new Date(theCase.orderDate).toDateString()) ||
  //   new Date(lastCauseListEntry.orderDate).toDateString() ===
  //     new Date(theCase.orderDate).toDateString();

  // /*
  // if (
  //   new Date(theCase.orderDate).toDateString() ===
  //     (new Date().toDateString() ||
  //       new Date(lastCauseListEntry.orderDate).toDateString()) &&
  //   theCase.causeListEntries.length > 1
  // ) {
  if (
    theCase.causeListEntries.length > 0 &&
    new Date(orderDate).toDateString() ===
      new Date(theCase.orderDate).toDateString()
  ) {
    //$set query
    // console.log("$set Query");
    causeListDates[causeListDates.length - 1] = orderDate;

    if (orderNumber || orderNumber === "") {
      // console.log("1 order number: " + orderNumber);
      updatedCase = await Case.findByIdAndUpdate(
        id,
        {
          orderNumber: orderNumber,
          orderDate: orderDate,
          $set: {
            [`causeListEntries.${theCase.causeListEntries.length - 1}`]: {
              ...lastCauseListEntry,
              orderNumber: orderNumber,
              orderDate: orderDate,
            },
          },
          causeListDates: causeListDates,
        },
        { new: true }
      );
    }

    if (nextDate) {
      // console.log("2 next date: " + nextDate);
      updatedCase = await Case.findByIdAndUpdate(
        id,
        {
          nextDate: nextDate,
          orderDate: orderDate,
          $set: {
            [`causeListEntries.${theCase.causeListEntries.length - 1}`]: {
              ...lastCauseListEntry,
              nextDate: nextDate,
              orderDate: orderDate,
            },
          },
          causeListDates: causeListDates,
        },
        { new: true }
      );
    }

    if (actionAbstract) {
      // console.log("3 action abstract: " + actionAbstract);
      updatedCase = await Case.findByIdAndUpdate(
        id,
        {
          actionAbstract: actionAbstract,
          orderDate: orderDate,
          $set: {
            [`causeListEntries.${theCase.causeListEntries.length - 1}`]: {
              ...lastCauseListEntry,
              actionAbstract: actionAbstract,
              orderDate: orderDate,
            },
          },
          causeListDates: causeListDates,
        },
        { new: true }
      );
    }
  } else {
    // $push query
    // console.log("$push Query");

    causeListDates.push(orderDate);

    if (orderNumber || orderNumber === "") {
      // console.log("1 order number: " + orderNumber);
      updatedCase = await Case.findByIdAndUpdate(
        id,
        {
          orderNumber: orderNumber,
          orderDate: orderDate,
          $push: {
            causeListEntries: {
              ...lastCauseListEntry,
              orderNumber: orderNumber,
              orderDate: orderDate,
            },
          },
          causeListDates: causeListDates,
        },
        { new: true }
      );
    }
    if (nextDate) {
      // console.log("2 next date: " + nextDate);
      updatedCase = await Case.findByIdAndUpdate(
        id,
        {
          nextDate: nextDate,
          orderDate: orderDate,
          $push: {
            causeListEntries: {
              ...lastCauseListEntry,
              nextDate: nextDate,
              orderDate: orderDate,
            },
          },
          causeListDates: causeListDates,
        },
        { new: true }
      );
    }

    if (actionAbstract) {
      // console.log("3 action abstract: " + actionAbstract);
      updatedCase = await Case.findByIdAndUpdate(
        id,
        {
          actionAbstract: actionAbstract,
          orderDate: orderDate,
          $push: {
            causeListEntries: {
              ...lastCauseListEntry,
              actionAbstract: actionAbstract,
              orderDate: orderDate,
            },
          },
          causeListDates: causeListDates,
        },
        { new: true }
      );
    }
  }

  //   console.log("updated Case: ");
  //   console.log(updatedCase);
  res.json(updatedCase);
  // */
};

export const deleteCase = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that ID");
  await Case.findByIdAndRemove(id);
  res.json({ message: "Post deleted successfully" });
};

export const likeCase = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that ID");

  const caseFile = await Case.findById(id);
  const updatedCase = await Case.findByIdAndUpdate(
    id,
    { likeCount: caseFile.likeCount + 1 },
    { new: true }
  );

  res.json(updatedCase);
};
export default router;
