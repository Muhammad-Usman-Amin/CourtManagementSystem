import mongoose from "mongoose";
import Case from "../models/case.js";
// import Datum from "../models/datum.js";
import express from "express";

const router = express.Router();

export const getCases = async (req, res) => {
  const query = req.query;

  try {
    // console.log(query);
    // below variable cases is taken global for each request so it will be filled with data required
    // based on query.reqQuery property!
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

    if (query.reqQuery === "GroupedFortnigtlyCases") {
      const datePend = new Date(query.datePendency);
      const monthPend = datePend.getMonth() + 1; // Months are zero-indexed (January is 0)
      const yearPend = datePend.getFullYear();

      let startDay, endDay;

      // Determine the start and end days based on the datePend
      if (datePend.getDate() <= 15) {
        startDay = 1;
        endDay = 15;
      } else {
        startDay = 16;
        // Determine the last day of the month
        endDay = new Date(yearPend, monthPend, 0).getDate();
      }

      cases = await Case.find({
        $and: [
          { disposed: { $ne: true } },
          {
            "Disposal OR Transfer Out Flag": {
              $nin: ["Disposed", "Transfer Out"],
            },
          },
          {
            $or: [
              {
                "Date of Institution ": {
                  $gte: new Date(yearPend, monthPend - 1, startDay),
                  $lte: new Date(yearPend, monthPend - 1, endDay),
                },
              },
              {
                "Date of Transfer In": {
                  $gte: new Date(yearPend, monthPend - 1, startDay),
                  $lte: new Date(yearPend, monthPend - 1, endDay),
                },
              },
              {
                "Date of Other Institution": {
                  $gte: new Date(yearPend, monthPend - 1, startDay),
                  $lte: new Date(yearPend, monthPend - 1, endDay),
                },
              },
            ],
          },
        ],
      }).sort({ ["Date of Institution "]: 1 });

      const groupedCases = cases.reduce((acc, currentCase) => {
        const category = currentCase["Category Per PQS"].replace(
          /^[A-Za-z]+-\d+-/,
          ""
        );
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(currentCase);
        return acc;
      }, {});
      // console.log(groupedCases);
      res.status(200).json(groupedCases);
      // res.status(200).json({ groupedCases: groupedCases });
      return;
    }

    if (query.reqQuery === "GroupedCases") {
      const datePend = new Date(query.datePendency);
      // Extract year and month
      const monthPend = datePend.getMonth() + 1; // Months are zero-indexed (January is 0)
      const yearPend = datePend.getFullYear();
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

      const groupedCases = cases.reduce((acc, currentCase) => {
        const category = currentCase["Category Per PQS"].replace(
          /^[A-Za-z]+-\d+-/,
          ""
        );
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(currentCase);
        return acc;
      }, {});
      // console.log(groupedCases);
      res.status(200).json(groupedCases);
      // res.status(200).json({ groupedCases: groupedCases });
      return;
    }

    if (query.reqQuery === "InstVsDispStats") {
      const selectedYear = new Date(query.dateYear).getFullYear();

      // Get the local time zone from the system
      const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      //   // Aggregation pipeline for counting institutions
      const institutions = await Case.aggregate([
        {
          // Project only the relevant field: "Date of Institution"
          $project: {
            institutionDate: "$Date of Institution ",
          },
        },
        {
          // Convert "Date of Institution" to the user's local time zone
          $addFields: {
            localInstitutionDate: {
              $dateFromString: {
                dateString: {
                  $dateToString: {
                    format: "%Y-%m-%dT%H:%M:%S", // Convert to string first
                    date: "$institutionDate", // Use the institution date
                    timezone: localTimeZone, // Apply user's time zone
                  },
                },
              },
            },
          },
        },
        {
          // Match the cases for the selected year after converting to the user's local timezone
          $match: {
            localInstitutionDate: {
              $gte: new Date(`${selectedYear}-01-01T00:00:00`), // Start of the selected year
              $lte: new Date(`${selectedYear}-12-31T23:59:59`), // End of the selected year
            },
          },
        },
        {
          // Group the cases by year and month of the local institution date
          $group: {
            _id: {
              year: { $year: "$localInstitutionDate" },
              month: { $month: "$localInstitutionDate" },
            },
            Institutions: { $sum: 1 }, // Count the number of institutions
          },
        },
        {
          // Project the output in the desired format (e.g., "2024-1")
          $project: {
            _id: 0,
            monthYear: {
              $concat: [
                { $toString: "$_id.year" },
                "-",
                { $toString: "$_id.month" },
              ],
            },
            Institutions: 1,
          },
        },
        {
          // Sort the result by year and month
          $sort: { monthYear: 1 },
        },
      ]);
      // console.log(institutions);

      // Aggregation pipeline for counting disposals
      const disposals = await Case.aggregate([
        {
          // Project the relevant field: "Date of Disposal Transfer Out"
          $project: {
            disposalDate: "$Date of Disposal Transfer Out",
          },
        },
        {
          // Convert "Date of Disposal Transfer Out" to the user's local time zone
          $addFields: {
            localDisposalDate: {
              $dateFromString: {
                dateString: {
                  $dateToString: {
                    format: "%Y-%m-%dT%H:%M:%S",
                    date: "$disposalDate",
                    timezone: localTimeZone,
                  },
                },
              },
            },
          },
        },
        {
          // Match the cases for the selected year after converting to the user's local timezone
          $match: {
            localDisposalDate: {
              $gte: new Date(`${selectedYear}-01-01T00:00:00`),
              $lte: new Date(`${selectedYear}-12-31T23:59:59`),
            },
          },
        },
        {
          // Group the cases by year and month of the local disposal date
          $group: {
            _id: {
              year: { $year: "$localDisposalDate" },
              month: { $month: "$localDisposalDate" },
            },
            Disposals: { $sum: 1 },
          },
        },
        {
          // Project the output in the desired format
          $project: {
            _id: 0,
            monthYear: {
              $concat: [
                { $toString: "$_id.year" },
                "-",
                { $toString: "$_id.month" },
              ],
            },
            Disposals: 1,
          },
        },
        {
          // Sort the result by year and month
          $sort: { monthYear: 1 },
        },
      ]);

      // console.log(disposals);

      const otherInstitutions = await Case.aggregate([
        {
          // Project the relevant field: "Date of Other Institution"
          $project: {
            otherInstitutionDate: "$Date of Other Institution",
          },
        },
        {
          // Convert "Date of Other Institution" to the user's local time zone
          $addFields: {
            localOtherInstitutionDate: {
              $dateFromString: {
                dateString: {
                  $dateToString: {
                    format: "%Y-%m-%dT%H:%M:%S",
                    date: "$otherInstitutionDate",
                    timezone: localTimeZone,
                  },
                },
              },
            },
          },
        },
        {
          // Match the cases for the selected year after converting to the user's local timezone
          $match: {
            localOtherInstitutionDate: {
              $gte: new Date(`${selectedYear}-01-01T00:00:00`),
              $lte: new Date(`${selectedYear}-12-31T23:59:59`),
            },
          },
        },
        {
          // Group the cases by year and month of the local other institution date
          $group: {
            _id: {
              year: { $year: "$localOtherInstitutionDate" },
              month: { $month: "$localOtherInstitutionDate" },
            },
            OtherInstitutions: { $sum: 1 },
          },
        },
        {
          // Project the output in the desired format
          $project: {
            _id: 0,
            monthYear: {
              $concat: [
                { $toString: "$_id.year" },
                "-",
                { $toString: "$_id.month" },
              ],
            },
            OtherInstitutions: 1,
          },
        },
        {
          // Sort the result by year and month
          $sort: { monthYear: 1 },
        },
      ]);

      // console.log(otherInstitutions);

      const transferedIn = await Case.aggregate([
        {
          // Project the relevant field: "Date of Transfer In"
          $project: {
            transferInDate: "$Date of Transfer In",
          },
        },
        {
          // Convert "Date of Transfer In" to the user's local time zone
          $addFields: {
            localTransferInDate: {
              $dateFromString: {
                dateString: {
                  $dateToString: {
                    format: "%Y-%m-%dT%H:%M:%S",
                    date: "$transferInDate",
                    timezone: localTimeZone,
                  },
                },
              },
            },
          },
        },
        {
          // Match the cases for the selected year after converting to the user's local timezone
          $match: {
            localTransferInDate: {
              $gte: new Date(`${selectedYear}-01-01T00:00:00`),
              $lte: new Date(`${selectedYear}-12-31T23:59:59`),
            },
          },
        },
        {
          // Group the cases by year and month of the local transfer-in date
          $group: {
            _id: {
              year: { $year: "$localTransferInDate" },
              month: { $month: "$localTransferInDate" },
            },
            TransferedIn: { $sum: 1 },
          },
        },
        {
          // Project the output in the desired format
          $project: {
            _id: 0,
            monthYear: {
              $concat: [
                { $toString: "$_id.year" },
                "-",
                { $toString: "$_id.month" },
              ],
            },
            TransferedIn: 1,
          },
        },
        {
          // Sort the result by year and month
          $sort: { monthYear: 1 },
        },
      ]);

      // console.log(transferIn);

      // Combine the results from all three arrays (institutions, disposals, otherInstitutions)
      const combinedStats = {};

      // Merge institutions
      institutions.forEach((item) => {
        if (!combinedStats[item.monthYear]) {
          combinedStats[item.monthYear] = {
            Institutions: 0,
            Disposals: 0,
            OtherInstitutions: 0,
            TransferedIn: 0,
          };
        }
        combinedStats[item.monthYear].Institutions = item.Institutions;
      });

      // Merge disposals
      disposals.forEach((item) => {
        if (!combinedStats[item.monthYear]) {
          combinedStats[item.monthYear] = {
            Institutions: 0,
            Disposals: 0,
            OtherInstitutions: 0,
            TransferedIn: 0,
          };
        }
        combinedStats[item.monthYear].Disposals = item.Disposals;
      });

      // Merge other institutions
      otherInstitutions.forEach((item) => {
        if (!combinedStats[item.monthYear]) {
          combinedStats[item.monthYear] = {
            Institutions: 0,
            Disposals: 0,
            OtherInstitutions: 0,
            TransferedIn: 0,
          };
        }
        combinedStats[item.monthYear].OtherInstitutions =
          item.OtherInstitutions;
      });

      // Merge transfered In
      transferedIn.forEach((item) => {
        if (!combinedStats[item.monthYear]) {
          combinedStats[item.monthYear] = {
            Institutions: 0,
            Disposals: 0,
            OtherInstitutions: 0,
            TransferedIn: 0,
          };
        }
        combinedStats[item.monthYear].TransferedIn = item.TransferedIn;
      });

      // Convert the combinedStats object back to an array and format the month names
      const finalStats = Object.keys(combinedStats).map((monthYear) => {
        const [year, month] = monthYear.split("-");
        return {
          // Month: `${
          //   [
          //     "January",
          //     "February",
          //     "March",
          //     "April",
          //     "May",
          //     "June",
          //     "July",
          //     "August",
          //     "September",
          //     "October",
          //     "November",
          //     "December",
          //   ][month - 1]}`,
          // }-${year}`,
          Month: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ][parseInt(month) - 1], // Only the month name is returned
          Institutions:
            combinedStats[monthYear].Institutions +
            combinedStats[monthYear].OtherInstitutions +
            combinedStats[monthYear].TransferedIn,
          Disposals: combinedStats[monthYear].Disposals,
          // OtherInstitutions: combinedStats[monthYear].OtherInstitutions,
        };
      });

      // Sort by month
      // finalStats.sort((a, b) => new Date(a.Month) - new Date(b.Month));
      // Sorting the finalStats array by the order of months
      const monthOrder = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      finalStats.sort((a, b) => {
        return monthOrder.indexOf(a.Month) - monthOrder.indexOf(b.Month);
      });

      // console.log(finalStats);
      res.status(200).json(finalStats);
      return;
    }

    // below code does not work correctly because of timezone issues for the given query!
    // if (query.reqQuery === "InstVsDispStats") {
    //   // console.log("InstVsDisp Called");
    //   const datePend = new Date(query.dateYear);
    //   // Extract year and month
    //   // const monthPend = datePend.getMonth() + 1; // Months are zero-indexed (January is 0)
    //   const selectedYear = datePend.getFullYear();
    //   // const selectedYear = 2022;

    //   // Aggregation pipeline for counting institutions
    //   const institutions = await Case.aggregate([
    //     {
    //       $match: {
    //         "Date of Institution ": {
    //           $gte: new Date(`${selectedYear}-01-01`),
    //           $lte: new Date(`${selectedYear}-12-31`),
    //         },
    //       },
    //     },
    //     {
    //       $group: {
    //         _id: {
    //           month: { $month: "$Date of Institution " },
    //           year: { $year: "$Date of Institution " },
    //         },
    //         count: { $sum: 1 },
    //       },
    //     },
    //     {
    //       $project: {
    //         _id: 0,
    //         monthYear: {
    //           $concat: [
    //             { $toString: "$_id.year" },
    //             "-",
    //             { $toString: "$_id.month" },
    //           ],
    //         },
    //         Institutions: "$count",
    //       },
    //     },
    //   ]);

    //   // Aggregation pipeline for counting disposals
    //   const disposals = await Case.aggregate([
    //     {
    //       $match: {
    //         "Date of Disposal Transfer Out": {
    //           $gte: new Date(`${selectedYear}-01-01`),
    //           $lte: new Date(`${selectedYear}-12-31`),
    //         },
    //       },
    //     },
    //     {
    //       $group: {
    //         _id: {
    //           month: { $month: "$Date of Disposal Transfer Out" },
    //           year: { $year: "$Date of Disposal Transfer Out" },
    //         },
    //         count: { $sum: 1 },
    //       },
    //     },
    //     {
    //       $project: {
    //         _id: 0,
    //         monthYear: {
    //           $concat: [
    //             { $toString: "$_id.year" },
    //             "-",
    //             { $toString: "$_id.month" },
    //           ],
    //         },
    //         Disposal: "$count",
    //       },
    //     },
    //   ]);

    //   // Aggregation pipeline for counting "Other Institutions"
    //   const otherInstitutions = await Case.aggregate([
    //     {
    //       $match: {
    //         "Date of Other Institution": {
    //           $gte: new Date(`${selectedYear}-01-01`),
    //           $lte: new Date(`${selectedYear}-12-31`),
    //         },
    //       },
    //     },
    //     {
    //       $group: {
    //         _id: {
    //           month: { $month: "$Date of Other Institution" },
    //           year: { $year: "$Date of Other Institution" },
    //         },
    //         count: { $sum: 1 },
    //       },
    //     },
    //     {
    //       $project: {
    //         _id: 0,
    //         monthYear: {
    //           $concat: [
    //             { $toString: "$_id.year" },
    //             "-",
    //             { $toString: "$_id.month" },
    //           ],
    //         },
    //         OtherInstitutions: "$count",
    //       },
    //     },
    //   ]);

    //   // Aggregation pipeline for counting "Date of Transfer In"
    //   const transferedIn = await Case.aggregate([
    //     {
    //       $match: {
    //         "Date of Transfer In": {
    //           $gte: new Date(`${selectedYear}-01-01`),
    //           $lte: new Date(`${selectedYear}-12-31`),
    //         },
    //       },
    //     },
    //     {
    //       $group: {
    //         _id: {
    //           month: { $month: "$Date of Transfer In" },
    //           year: { $year: "$Date of Transfer In" },
    //         },
    //         count: { $sum: 1 },
    //       },
    //     },
    //     {
    //       $project: {
    //         _id: 0,
    //         monthYear: {
    //           $concat: [
    //             { $toString: "$_id.year" },
    //             "-",
    //             { $toString: "$_id.month" },
    //           ],
    //         },
    //         TransferedIn: "$count",
    //       },
    //     },
    //   ]);
    //   // console.log(transferedIn);

    //   // Combine the results from all three arrays (institutions, disposals, otherInstitutions)
    //   const combinedStats = {};

    //   // Merge institutions
    //   institutions.forEach((item) => {
    //     if (!combinedStats[item.monthYear]) {
    //       combinedStats[item.monthYear] = {
    //         Institutions: 0,
    //         Disposal: 0,
    //         OtherInstitutions: 0,
    //         TransferedIn: 0,
    //       };
    //     }
    //     combinedStats[item.monthYear].Institutions = item.Institutions;
    //   });

    //   // Merge disposals
    //   disposals.forEach((item) => {
    //     if (!combinedStats[item.monthYear]) {
    //       combinedStats[item.monthYear] = {
    //         Institutions: 0,
    //         Disposal: 0,
    //         OtherInstitutions: 0,
    //         TransferedIn: 0,
    //       };
    //     }
    //     combinedStats[item.monthYear].Disposal = item.Disposal;
    //   });

    //   // Merge other institutions
    //   otherInstitutions.forEach((item) => {
    //     if (!combinedStats[item.monthYear]) {
    //       combinedStats[item.monthYear] = {
    //         Institutions: 0,
    //         Disposal: 0,
    //         OtherInstitutions: 0,
    //         TransferedIn: 0,
    //       };
    //     }
    //     combinedStats[item.monthYear].OtherInstitutions =
    //       item.OtherInstitutions;
    //   });

    //   // Merge transfered In
    //   transferedIn.forEach((item) => {
    //     if (!combinedStats[item.monthYear]) {
    //       combinedStats[item.monthYear] = {
    //         Institutions: 0,
    //         Disposal: 0,
    //         OtherInstitutions: 0,
    //         TransferedIn: 0,
    //       };
    //     }
    //     combinedStats[item.monthYear].TransferedIn = item.TransferedIn;
    //   });

    //   // Convert the combinedStats object back to an array and format the month names
    //   const finalStats = Object.keys(combinedStats).map((monthYear) => {
    //     const [year, month] = monthYear.split("-");
    //     return {
    //       // Month: `${
    //       //   [
    //       //     "January",
    //       //     "February",
    //       //     "March",
    //       //     "April",
    //       //     "May",
    //       //     "June",
    //       //     "July",
    //       //     "August",
    //       //     "September",
    //       //     "October",
    //       //     "November",
    //       //     "December",
    //       //   ][month - 1]}`,
    //       // }-${year}`,
    //       Month: [
    //         "January",
    //         "February",
    //         "March",
    //         "April",
    //         "May",
    //         "June",
    //         "July",
    //         "August",
    //         "September",
    //         "October",
    //         "November",
    //         "December",
    //       ][parseInt(month) - 1], // Only the month name is returned
    //       Institutions:
    //         combinedStats[monthYear].Institutions +
    //         combinedStats[monthYear].OtherInstitutions +
    //         combinedStats[monthYear].TransferedIn,
    //       Disposals: combinedStats[monthYear].Disposal,
    //       // OtherInstitutions: combinedStats[monthYear].OtherInstitutions,
    //     };
    //   });

    //   // Sort by month
    //   // finalStats.sort((a, b) => new Date(a.Month) - new Date(b.Month));
    //   // Sorting the finalStats array by the order of months
    //   const monthOrder = [
    //     "January",
    //     "February",
    //     "March",
    //     "April",
    //     "May",
    //     "June",
    //     "July",
    //     "August",
    //     "September",
    //     "October",
    //     "November",
    //     "December",
    //   ];

    //   finalStats.sort((a, b) => {
    //     return monthOrder.indexOf(a.Month) - monthOrder.indexOf(b.Month);
    //   });

    //   // console.log(finalStats);
    //   res.status(200).json(finalStats);
    //   return;
    // }

    // if(query.reqQuery === "InstituionsStatistics"){
    if (query.reqQuery === "InstitutionsStatistics") {
      // const result = await Case.aggregate([
      //   {
      //     $project: {
      //       dates: [
      //         { date: '$Date of Institution ' },
      //         { date: '$Date of Transfer In' },
      //         { date: '$Date of Other Institution' }
      //       ],
      //       disposalFlag: '$Disposal OR Transfer Out Flag'  //for pendency of each month
      //     }
      //   },
      //   { $unwind: '$dates' },
      //   {
      //     $match: {
      //       'dates.date': { $ne: null },  // Ensure the date is not null
      //       disposalFlag: { $nin: ["Disposed", "Transfer Out"] }  // Exclude specified values
      //     }
      //   },
      //   {
      //     $group: {
      //       _id: {
      //         year: { $year: '$dates.date' },
      //         month: { $month: '$dates.date' }
      //       },
      //       count: { $sum: 1 }
      //     }
      //   },
      //   {
      //     $project: {
      //       _id: 0,
      //       month: '$_id.month',
      //       year: '$_id.year',
      //       count: 1
      //     }
      //   },
      //   {
      //     $sort: { year: 1, month: 1 }
      //   }
      // ]);
      // // console.log(result);

      // // Transform the result to the desired format
      // const formattedResult = result.map(item => {
      //   const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      //   const formattedDate = `${monthNames[item.month - 1]}-${item.year}`;
      //   return {
      //     date: formattedDate, // e.g., "May-2024"
      //     cases: item.count
      //   };
      // });

      // // console.log(formattedResult);
      // res.status(200).json(formattedResult);
      //   return;

      const result = await Case.aggregate([
        {
          $project: {
            dates: [
              { date: "$Date of Institution " },
              { date: "$Date of Transfer In" },
              { date: "$Date of Other Institution" },
            ],
            disposalFlag: "$Disposal OR Transfer Out Flag", //for pendency of each month
          },
        },
        { $unwind: "$dates" },
        {
          $addFields: {
            "dates.localDate": {
              $let: {
                vars: {
                  localDate: {
                    $dateFromString: {
                      dateString: {
                        $dateToString: {
                          format: "%Y-%m-%dT%H:%M:%SZ",
                          date: "$dates.date",
                          timezone: "Asia/Karachi",
                        },
                      },
                    },
                  },
                },
                in: "$$localDate",
              },
            },
          },
        },
        {
          $match: {
            "dates.localDate": { $ne: null }, // Ensure the date is not null
            disposalFlag: { $nin: ["Disposed", "Transfer Out"] }, // Exclude specified values
          },
        },
        {
          $group: {
            _id: {
              year: { $year: "$dates.localDate" },
              month: { $month: "$dates.localDate" },
            },
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            month: "$_id.month",
            year: "$_id.year",
            count: 1,
          },
        },
        {
          $sort: { year: 1, month: 1 },
        },
      ]);

      // console.log(result);
      // Transform the result to the desired format
      const formattedResult = result.map((item) => {
        const monthNames = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        const formattedDate = `${monthNames[item.month - 1]}-${item.year}`;
        return {
          date: formattedDate, // e.g., "May-2024"
          cases: item.count,
        };
      });

      res.status(200).json(formattedResult);
      return;
    }

    if (query.reqQuery === "FortnightlyReport") {
      const datePend = new Date(query.selectedMonth);
      // Extract year and month
      const month = datePend.getMonth() + 1; // Months are zero-indexed (January is 0)
      const year = datePend.getFullYear();
      // const month = 6;
      // console.log(month);

      const startOfMonth = new Date(year, month - 1, 1); // Start of the month
      const middleOfMonth = new Date(year, month - 1, 15, 23, 59, 59); // End of 1st fortnight
      const startOfSecondFortnight = new Date(year, month - 1, 16); // Start of 2nd fortnight
      const endOfMonth = new Date(year, month, 0, 23, 59, 59); // End of the month

      const cases = await Case.aggregate([
        {
          $match: {
            $or: [
              {
                "Date of Institution ": {
                  $gte: startOfMonth,
                  $lte: endOfMonth,
                },
              },
              {
                "Date of Other Institution": {
                  $gte: startOfMonth,
                  $lte: endOfMonth,
                },
              }, // Restored
              {
                "Date of Transfer In": { $gte: startOfMonth, $lte: endOfMonth },
              },
              {
                "Date of Disposal Transfer Out": {
                  $gte: startOfMonth,
                  $lte: endOfMonth,
                },
              },
            ],
          },
        },
        {
          $facet: {
            firstFortnight: [
              {
                $match: {
                  $or: [
                    {
                      "Date of Institution ": {
                        $gte: startOfMonth,
                        $lte: middleOfMonth,
                      },
                    },
                    {
                      "Date of Other Institution": {
                        $gte: startOfMonth,
                        $lte: middleOfMonth,
                      },
                    }, // Restored
                    {
                      "Date of Transfer In": {
                        $gte: startOfMonth,
                        $lte: middleOfMonth,
                      },
                    },
                    {
                      "Date of Disposal Transfer Out": {
                        $gte: startOfMonth,
                        $lte: middleOfMonth,
                      },
                    },
                  ],
                },
              },
              {
                $group: {
                  _id: "$Category Per PQS",
                  institutions: {
                    $sum: {
                      $cond: [
                        {
                          $and: [
                            { $gte: ["$Date of Institution ", startOfMonth] },
                            { $lte: ["$Date of Institution ", middleOfMonth] },
                          ],
                        },
                        1,
                        0,
                      ],
                    },
                  },
                  restored: {
                    $sum: {
                      $cond: [
                        {
                          $and: [
                            {
                              $gte: [
                                "$Date of Other Institution",
                                startOfMonth,
                              ],
                            },
                            {
                              $lte: [
                                "$Date of Other Institution",
                                middleOfMonth,
                              ],
                            },
                          ],
                        },
                        1,
                        0,
                      ],
                    },
                  },
                  transferredIn: {
                    $sum: {
                      $cond: [
                        {
                          $and: [
                            { $gte: ["$Date of Transfer In", startOfMonth] },
                            { $lte: ["$Date of Transfer In", middleOfMonth] },
                          ],
                        },
                        1,
                        0,
                      ],
                    },
                  },
                  totalDisposals: {
                    $sum: {
                      $cond: [
                        {
                          $and: [
                            {
                              $eq: [
                                "$Disposal OR Transfer Out Flag",
                                "Disposed",
                              ],
                            },
                            {
                              $gte: [
                                "$Date of Disposal Transfer Out",
                                startOfMonth,
                              ],
                            },
                            {
                              $lte: [
                                "$Date of Disposal Transfer Out",
                                middleOfMonth,
                              ],
                            },
                          ],
                        },
                        1,
                        0,
                      ],
                    },
                  },
                  totalTransferOut: {
                    $sum: {
                      $cond: [
                        {
                          $and: [
                            {
                              $eq: [
                                "$Disposal OR Transfer Out Flag",
                                "Transfer Out",
                              ],
                            },
                            {
                              $gte: [
                                "$Date of Disposal Transfer Out",
                                startOfMonth,
                              ],
                            },
                            {
                              $lte: [
                                "$Date of Disposal Transfer Out",
                                middleOfMonth,
                              ],
                            },
                          ],
                        },
                        1,
                        0,
                      ],
                    },
                  },
                },
              },
              {
                $project: {
                  _id: 0,
                  category: "$_id",
                  institutions: 1,
                  restored: 1,
                  transferredIn: 1,
                  totalDisposals: 1,
                  totalTransferOut: 1,
                },
              },
              {
                $sort: { institutions: -1 }, // Sort by institutions in descending order
              },
            ],
            secondFortnight: [
              {
                $match: {
                  $or: [
                    {
                      "Date of Institution ": {
                        $gte: startOfSecondFortnight,
                        $lte: endOfMonth,
                      },
                    },
                    {
                      "Date of Other Institution": {
                        $gte: startOfSecondFortnight,
                        $lte: endOfMonth,
                      },
                    }, // Restored
                    {
                      "Date of Transfer In": {
                        $gte: startOfSecondFortnight,
                        $lte: endOfMonth,
                      },
                    },
                    {
                      "Date of Disposal Transfer Out": {
                        $gte: startOfSecondFortnight,
                        $lte: endOfMonth,
                      },
                    },
                  ],
                },
              },
              {
                $group: {
                  _id: "$Category Per PQS",
                  institutions: {
                    $sum: {
                      $cond: [
                        {
                          $and: [
                            {
                              $gte: [
                                "$Date of Institution ",
                                startOfSecondFortnight,
                              ],
                            },
                            { $lte: ["$Date of Institution ", endOfMonth] },
                          ],
                        },
                        1,
                        0,
                      ],
                    },
                  },
                  restored: {
                    $sum: {
                      $cond: [
                        {
                          $and: [
                            {
                              $gte: [
                                "$Date of Other Institution",
                                startOfSecondFortnight,
                              ],
                            },
                            {
                              $lte: ["$Date of Other Institution", endOfMonth],
                            },
                          ],
                        },
                        1,
                        0,
                      ],
                    },
                  },
                  transferredIn: {
                    $sum: {
                      $cond: [
                        {
                          $and: [
                            {
                              $gte: [
                                "$Date of Transfer In",
                                startOfSecondFortnight,
                              ],
                            },
                            { $lte: ["$Date of Transfer In", endOfMonth] },
                          ],
                        },
                        1,
                        0,
                      ],
                    },
                  },
                  totalDisposals: {
                    $sum: {
                      $cond: [
                        {
                          $and: [
                            {
                              $eq: [
                                "$Disposal OR Transfer Out Flag",
                                "Disposed",
                              ],
                            },
                            {
                              $gte: [
                                "$Date of Disposal Transfer Out",
                                startOfSecondFortnight,
                              ],
                            },
                            {
                              $lte: [
                                "$Date of Disposal Transfer Out",
                                endOfMonth,
                              ],
                            },
                          ],
                        },
                        1,
                        0,
                      ],
                    },
                  },
                  totalTransferOut: {
                    $sum: {
                      $cond: [
                        {
                          $and: [
                            {
                              $eq: [
                                "$Disposal OR Transfer Out Flag",
                                "Transfer Out",
                              ],
                            },
                            {
                              $gte: [
                                "$Date of Disposal Transfer Out",
                                startOfSecondFortnight,
                              ],
                            },
                            {
                              $lte: [
                                "$Date of Disposal Transfer Out",
                                endOfMonth,
                              ],
                            },
                          ],
                        },
                        1,
                        0,
                      ],
                    },
                  },
                },
              },
              {
                $project: {
                  _id: 0,
                  category: "$_id",
                  institutions: 1,
                  restored: 1,
                  transferredIn: 1,
                  totalDisposals: 1,
                  totalTransferOut: 1,
                },
              },
              {
                $sort: { institutions: -1 }, // Sort by institutions in descending order
              },
            ],
          },
        },
      ]);

      res.status(200).json(cases);
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
      // console.log(distinctCategories);

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
      // console.log(categoryCounts);

      // Prepare results in the desired format
      const results = Object.keys(categoryCounts)
        .map((category) => ({
          name: category.replace(/^[A-Za-z]+-\d+-/, ""),
          cases: categoryCounts[category],
        }))
        .sort((a, b) => b.cases - a.cases); //for sorting
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

      const monthDisp = dateDisp.getMonth() + 1; // Months are zero-indexed (January is 0)
      const yearDisp = dateDisp.getFullYear();
      // console.log(query);
      // cases = await Case.find({
      //   // $and: [
      //   // disposed: true,
      //   $expr: {
      //     $and: [
      //       { $eq: [{ $month: "$Date of Disposal Transfer Out" }, monthDisp] },
      //       { $eq: [{ $year: "$Date of Disposal Transfer Out" }, yearDisp] },
      //       // {$eq: ["$Disposal OR Transfer Out Flag", "Disposed"]}, // for disposals only
      //     ],
      //   },
      //   // "Disposal OR Transfer Out Flag": {
      //   //   $in: ["Disposed", "Transfer Out"],
      //   // },
      //   //upper and below both method works
      //   // $or: [
      //   //   { "Disposal OR Transfer Out Flag": "Disposed" },
      //   //   { "Disposal OR Transfer Out Flag": "Transfer Out" }
      //   // ],
      //   // ],
      // }).sort({ ["Date of Institution "]: 1 });
      // }

      // cases = await Case.aggregate([
      //   {
      //     $addFields: {
      //       localDateOfDisposalTransferOut: {
      //         $dateFromString: {
      //           dateString: {
      //             $dateToString: {
      //               format: '%Y-%m-%dT%H:%M:%SZ',
      //               date: '$Date of Disposal Transfer Out',
      //               timezone: 'Asia/Karachi'
      //             }
      //           }
      //         }
      //       }
      //     }
      //   },
      //   {
      //     $match: {
      //       $expr: {
      //         $and: [
      //           { $eq: [{ $month: "$localDateOfDisposalTransferOut" }, monthDisp] },
      //           { $eq: [{ $year: "$localDateOfDisposalTransferOut" }, yearDisp] },
      //         ],
      //       },
      //     },
      //   },
      //   {
      //     $sort: { "Date of Institution ": 1 }
      //   }
      // ]);

      // cases = await Datum.aggregate([
      cases = await Case.aggregate([
        {
          $addFields: {
            localDateOfDisposalTransferOut: {
              $cond: {
                if: {
                  $and: [
                    { $ne: ["$Date of Disposal Transfer Out", null] },
                    {
                      $eq: [
                        { $type: "$Date of Disposal Transfer Out" },
                        "date",
                      ],
                    },
                  ],
                },
                then: {
                  $dateFromString: {
                    dateString: {
                      $dateToString: {
                        format: "%Y-%m-%dT%H:%M:%SZ",
                        date: "$Date of Disposal Transfer Out",
                        timezone: "Asia/Karachi",
                      },
                    },
                  },
                },
                else: null,
              },
            },
          },
        },
        {
          $match: {
            localDateOfDisposalTransferOut: { $ne: null },
            $expr: {
              $and: [
                {
                  $eq: [
                    { $month: "$localDateOfDisposalTransferOut" },
                    monthDisp,
                  ],
                },
                {
                  $eq: [{ $year: "$localDateOfDisposalTransferOut" }, yearDisp],
                },
              ],
            },
          },
        },
        {
          // $sort: { "Date of Institution ": 1 }
          $sort: { "Date of Disposal Transfer Out": 1 },
        },
      ]);
    }
    // }
    // console.log(query);

    if (query.reqQuery === "InstitutionCases") {
      const dateObj = new Date(query.dateInstitution);
      // Extract year and month
      const month = dateObj.getMonth() + 1; // Months are zero-indexed (January is 0)
      const year = dateObj.getFullYear();

      const selectedMonth = month; // Assuming the user selects April (Month 4)
      const selectedYear = year; // Assuming the user selects the year 2024
      //   cases = await Case.aggregate([
      //     {
      //       $match: {
      //         $or: [
      //           {
      //             $expr: {
      //               $and: [
      //                 {
      //                   $eq: [{ $month: "$Date of Institution " }, selectedMonth],
      //                 },
      //                 { $eq: [{ $year: "$Date of Institution " }, selectedYear] },
      //               ],
      //             },
      //           },
      //           {
      //             $expr: {
      //               $and: [
      //                 {
      //                   $eq: [{ $month: "$Date of Transfer In" }, selectedMonth],
      //                 },
      //                 { $eq: [{ $year: "$Date of Transfer In" }, selectedYear] },
      //               ],
      //             },
      //           },
      //           {
      //             $expr: {
      //               $and: [
      //                 {
      //                   $eq: [
      //                     { $month: "$Date of Other Institution" },
      //                     selectedMonth,
      //                   ],
      //                 },
      //                 {
      //                   $eq: [
      //                     { $year: "$Date of Other Institution" },
      //                     selectedYear,
      //                   ],
      //                 },
      //               ],
      //             },
      //           },
      //         ],
      //       },
      //     },
      //   ]).sort({ ["Date of Institution "]: 1 });
      // }

      // below code fixes the timezome issue, mongodb save documents by default to UTC dates which
      // create problems whien you want to fetch those dates for calculations.
      cases = await Case.aggregate([
        {
          $addFields: {
            localDateOfInstitution: {
              $dateFromString: {
                dateString: {
                  $dateToString: {
                    format: "%Y-%m-%dT%H:%M:%SZ",
                    date: "$Date of Institution ",
                    timezone: "Asia/Karachi",
                  },
                },
              },
            },
            localDateOfTransferIn: {
              $dateFromString: {
                dateString: {
                  $dateToString: {
                    format: "%Y-%m-%dT%H:%M:%SZ",
                    date: "$Date of Transfer In",
                    timezone: "Asia/Karachi",
                  },
                },
              },
            },
            localDateOfOtherInstitution: {
              $dateFromString: {
                dateString: {
                  $dateToString: {
                    format: "%Y-%m-%dT%H:%M:%SZ",
                    date: "$Date of Other Institution",
                    timezone: "Asia/Karachi",
                  },
                },
              },
            },
          },
        },
        {
          $match: {
            $or: [
              {
                $expr: {
                  $and: [
                    {
                      $eq: [
                        { $month: "$localDateOfInstitution" },
                        selectedMonth,
                      ],
                    },
                    {
                      $eq: [{ $year: "$localDateOfInstitution" }, selectedYear],
                    },
                  ],
                },
              },
              {
                $expr: {
                  $and: [
                    {
                      $eq: [
                        { $month: "$localDateOfTransferIn" },
                        selectedMonth,
                      ],
                    },
                    {
                      $eq: [{ $year: "$localDateOfTransferIn" }, selectedYear],
                    },
                  ],
                },
              },
              {
                $expr: {
                  $and: [
                    {
                      $eq: [
                        { $month: "$localDateOfOtherInstitution" },
                        selectedMonth,
                      ],
                    },
                    {
                      $eq: [
                        { $year: "$localDateOfOtherInstitution" },
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

// function stripTime(date) {
//   date.setHours(0, 0, 0, 0);
//   return date;
// }

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
    isOtherPoliceStation,
    AcquittalORConviction,
  } = body;

  // Ensure the date is correctly set to the local timezone start of day
  // console.log(dateOfInstitution)
  // let { dateOfInst } = startOfDay(parseISO(dateOfInstitution));
  // console.log(dateOfInst);

  // console.log(caseTitle);
  // const datIns = stripTime(dateOfInstitution)
  // console.log(datIns);

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
    // ["Date of Institution "]: dateOfInst,
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
    isOtherPoliceStation,
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
  // console.log(new Date());

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
