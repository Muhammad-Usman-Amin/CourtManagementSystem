// import mongoose from "mongoose";
// import EmployeeData from "../models/employeeData.js";
import Case from "../models/case.js";
// import express, { query } from 'express';
import express from "express";
const router = express.Router();

export const getCauseList = async (req, res) => {
  if (req.query.dateCauseList) {
    const { dateCauseList } = req.query;
    // console.log(dateCauseList);
    //   console.log(new Date(dateCauseList).toDateString());
    //   const date = new Date(dateCauseList).toDateString();
    const selectedDate = new Date(dateCauseList);
    // console.log(new Date().toISOString().split("T")[0]); //prints 2024-04-25
    //   const today = new Date(dateCauseList);
    //   today.setUTCHours(0, 0, 0, 0);
    //   console.log(selectedDate);
    //   console.log(selectedDate.toISOString().split("T")[0]);

    // try {

    // const employeesData = await EmployeeData.find();

    // const query = await EmployeeData.find({ designation: query.designation })
    // .sort({ dateOfDesignation: 1 });

    // const today = new Date(); // Assuming today's date

    // const query = {
    //   $or: [
    //     //   { orderDate: { $eq: selectedDate } }, // this won't work because string are not same due to time
    //     //   { nextDate: { $eq: selectedDate } },
    //     {
    //       $expr: {
    //         $eq: [
    //           {
    //             $dateToString: {
    //               format: "%Y-%m-%d",
    //               date: "$orderDate",
    //               timezone: "+05:00",
    //             },
    //           },
    //           selectedDate.toISOString().split("T")[0],
    //         ],
    //       },
    //     },
    //     {
    //       $expr: {
    //         $eq: [
    //           {
    //             $dateToString: {
    //               format: "%Y-%m-%d",
    //               date: "$nextDate",
    //               timezone: "+05:00",
    //             },
    //           },
    //           selectedDate.toISOString().split("T")[0],
    //         ],
    //       },
    //     },
    //     // { //currently not working (will figure out later)
    //     //   causeListDates: {$in: [selectedDate.toISOString()]}, // Check if the date exists in the causeListDates array
    //     // },
    //   ],
    // };

    const query = {
      $and: [
        {
          disposed: { $ne: true }, // Exclude cases where disposed is true
          transferedOut: { $ne: true },
        },
        {
          $or: [
            {
              $expr: {
                $eq: [
                  {
                    $dateToString: {
                      format: "%Y-%m-%d",
                      date: "$orderDate",
                      timezone: "+05:00",
                    },
                  },
                  selectedDate.toISOString().split("T")[0],
                ],
              },
            },
            {
              $expr: {
                $eq: [
                  {
                    $dateToString: {
                      format: "%Y-%m-%d",
                      date: "$nextDate",
                      timezone: "+05:00",
                    },
                  },
                  selectedDate.toISOString().split("T")[0],
                ],
              },
            },
          ],
        },
      ],
    };

    // Assuming you have a MongoDB collection named "records"
    // const result = await db.collection('records').find(query).toArray();
    try {
      const result = await Case.find(query);
      const serialNumbers = result.map((_, index) => index + 1);
      // console.log(serialNumbers);
      // console.log("Fetched data length:", result.length);
      // res.status(201).json(result);
      res.status(200).json({
        cases: result,
        serialNumbers
      });
    } catch (error) {
      console.log("Fetched data error:", error);
      res.status(409).json({ error });
    }
  }

  if (req.query.range === "range") {
    // console.log("range triggered");
    // const { startDate, endDate } = req.query;

    const startDateObj = new Date();

    // Create a new date object to avoid modifying the original
    const endDateObj = new Date(startDateObj.getTime());

    // Add 10 days to the new date object
    endDateObj.setDate(endDateObj.getDate() + 90);

    // console.log("Original Date:", startDateObj);
    // console.log("Date after adding 10 days:", endDateObj);

    // const startDateObj = new Date(startDate);
    // const endDateObj = new Date(endDate);
    // const startDateObj = new Date();
    // const endDateObj =  new Date(startDateObj.getDate() + 5);
    // console.log(startDateObj + "  enddateobj:");
    // console.log(endDateObj);

    const results = [];

    // Iterate over consecutive dates
    let currentDate = new Date(startDateObj);
    while (currentDate <= endDateObj) {
      const query = {
        $and: [
          {
            disposed: { $ne: true }, // Exclude cases where disposed is true
            transferedOut: { $ne: true },
          },
          {
            $or: [
              {
                $expr: {
                  $eq: [
                    {
                      $dateToString: {
                        format: "%Y-%m-%d",
                        date: "$orderDate",
                        timezone: "+05:00",
                      },
                    },
                    currentDate.toISOString().split("T")[0],
                  ],
                },
              },
              {
                $expr: {
                  $eq: [
                    {
                      $dateToString: {
                        format: "%Y-%m-%d",
                        date: "$nextDate",
                        timezone: "+05:00",
                      },
                    },
                    currentDate.toISOString().split("T")[0],
                  ],
                },
              },
            ],
          },
        ],
      };

      try {
        const result = await Case.find(query);
        let attendance = 0;
        let evidence = 0;
        let argument = 0;
        let finalArguments = 0;
        let order = 0;
        let finalOrder = 0;
        let orderOnApplication = 0;

        if (result.length !== 0) {
          result.forEach((file) => {
            // Calculate attendance for each file
            attendance += file?.actionAbstract.includes("حاضری") ? 1 : 0;
            evidence += file?.actionAbstract.includes("شہادت") ? 1 : 0;
            argument += file?.actionAbstract.includes("بحث") ? 1 : 0;
            finalArguments += file?.actionAbstract.includes("بحث بر مقدمہ") ? 1 : 0;
            order += file?.actionAbstract.includes("حکم") ? 1 : 0;
            finalOrder += file?.actionAbstract.includes("حکم بر مقدمہ") ? 1 : 0;
            orderOnApplication += file?.actionAbstract.includes("حکم بر درخواست") ? 1 : 0;
          });

          results.push({
            date: currentDate.toISOString().split("T")[0],
            data: result,
            attendance: attendance,
            evidence: evidence,
            argument: argument,
            finalArguments: finalArguments,
            order: order,
            orderOnApplication: orderOnApplication,
            finalOrder: finalOrder,
          });
        }
      } catch (error) {
        console.log("Fetched data error:", error);
        res.status(409).json({ error });
        return; // Stop the execution if there's an error
      }

      // Move to the next date
      currentDate.setDate(currentDate.getDate() + 1);
    }
    // console.log(results);
    res.status(201).json(results);
  }

  //   Case.find(query)
  //     // .sort({ dateOfInitialAppointment: 1 })
  //     .exec((err, data) => {
  //       if (err) {
  //         console.error("Error fetching data:", err);
  //         res.status(404).json({ message: err.message });
  //         // Handle the error appropriately
  //         return;
  //       }
  //       // console.log(query);
  //       // res.status(200).json(employeesData);
  //       // } catch (error) {
  //       //     res.status(404).json({ message: error.message });
  //       // }
  //       console.log("Fetched data:", data);
  //       return res.status(200).json(data);
  //     });
};

// export const createEmployeeData = async (req, res) => {

//     // const { title, caseNumber, caseType, caseSubType, FIR, FIRdate, UnderSection, policeStation, institutionDate, disposalDate, isTransferedIn } = req.body;
//     // const newCase = new Case({ title, caseNumber, caseType, caseSubType, FIR, FIRdate, UnderSection, policeStation, institutionDate, disposalDate, isTransferedIn });

//     const { body } = req;
//     // console.log(body);
//     const { name, designation, dutyAs, attachedToCourt, fatherName, dateOfBirth, gender, currentAddress, permanentAddress, sameAsCurrentAddress,
//         email, mobileNumber, maritalStatus, promotions, initialAppointmentAs,
//         dateOfInitialAppointment, appointedOnAnySonQuota, fatherDesignation, fatherDateOfRetirement,
//         transferHistory, children, nearestStationToHome, nearestStationToHomeC1, nearestStationToHomeC2, nearestStationToHomeC3,
//         IsSufferingFromDisease, highestQualification, professionalQualification, computerLiteracy, computerLiteracyLevel, extraSkill } = body;
//     // console.log(caseTitle);

//     const newEmployeeFile = new EmployeeData({
//         name, designation, dutyAs, attachedToCourt, fatherName, dateOfBirth, gender, currentAddress, permanentAddress, sameAsCurrentAddress,
//         email, mobileNumber, maritalStatus, promotions, initialAppointmentAs,
//         dateOfInitialAppointment, appointedOnAnySonQuota, fatherDesignation, fatherDateOfRetirement,
//         transferHistory, children, nearestStationToHome, nearestStationToHomeC1, nearestStationToHomeC2, nearestStationToHomeC3,
//         IsSufferingFromDisease, highestQualification, professionalQualification, computerLiteracy, computerLiteracyLevel, extraSkill
//     });

//     try {
//         await newEmployeeFile.save();
//         res.status(201).json(newEmployeeFile);
//     } catch (error) {
//         res.status(409).json({ error });
//     }
// }

// export const updateEmployeeData = async (req, res) => {
//     const { id } = req.params;
//     const employeeFile = req.body;
//     // console.log(caseFile);

//     if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that ID');

//     const updatedFile = await EmployeeData.findByIdAndUpdate(id, { ...employeeFile, id }, { new: true });

//     res.json(updatedFile);

//     // const { orderDate, orderNumber, nextDate, actionAbstract } = req.body;

//     // const theCase = await EmployeeData.findById(id);
//     // let updatedCase = null;

//     // const lastCase = theCase.causeListEntries.toObject();
//     // const cEntry = lastCase[lastCase.length - 1];
//     // console.log(cEntry);

//     // if (new Date(theCase.orderDate).toDateString() === new Date().toDateString()) {

//     //     //$set query
//     //     // console.log("$set Query");

//     //     if (orderNumber || orderNumber === '') {
//     //         // console.log("1 order number: " + orderNumber);
//     //         updatedCase = await EmployeeData.findByIdAndUpdate(id, {
//     //             orderNumber: orderNumber, orderDate: orderDate,
//     //             $set: {
//     //                 [`causeListEntries.${theCase.causeListEntries.length - 1}`]: { ...cEntry, orderNumber: orderNumber, orderDate: orderDate }
//     //             }
//     //         },
//     //             { new: true });
//     //     }

//     //     if (nextDate) {
//     //         // console.log("2 next date: " + nextDate);
//     //         updatedCase = await EmployeeData.findByIdAndUpdate(id, {
//     //             nextDate: nextDate, orderDate: orderDate,
//     //             $set: {
//     //                 [`causeListEntries.${theCase.causeListEntries.length - 1}`]: { ...cEntry, nextDate: nextDate, orderDate: orderDate }
//     //             }
//     //         },
//     //             { new: true });

//     //     }

//     //     if (actionAbstract) {
//     //         // console.log("3 action abstract: " + actionAbstract);
//     //         updatedCase = await EmployeeData.findByIdAndUpdate(id, {
//     //             actionAbstract: actionAbstract, orderDate: orderDate,
//     //             $set: {
//     //                 [`causeListEntries.${theCase.causeListEntries.length - 1}`]: { ...cEntry, actionAbstract: actionAbstract, orderDate: orderDate }
//     //             }
//     //         },
//     //             { new: true });

//     //     }

//     // } else {

//     //     // $push query
//     //     // console.log("$push Query");

//     //     if (orderNumber || orderNumber === '') {
//     //         // console.log("1 order number: " + orderNumber);
//     //         updatedCase = await EmployeeData.findByIdAndUpdate(id, {
//     //             orderNumber: orderNumber, orderDate: orderDate,
//     //             $push: {
//     //                 causeListEntries: { ...cEntry, orderNumber: orderNumber, orderDate: orderDate }
//     //             }
//     //         },
//     //             { new: true });
//     //     }
//     //     if (nextDate) {
//     //         // console.log("2 next date: " + nextDate);
//     //         updatedCase = await EmployeeData.findByIdAndUpdate(id, {
//     //             nextDate: nextDate, orderDate: orderDate,
//     //             $push: {
//     //                 causeListEntries: { ...cEntry, nextDate: nextDate, orderDate: orderDate }
//     //             }
//     //         },
//     //             { new: true });
//     //     }

//     //     if (actionAbstract) {
//     //         // console.log("3 action abstract: " + actionAbstract);
//     //         updatedCase = await EmployeeData.findByIdAndUpdate(id, {
//     //             actionAbstract: actionAbstract, orderDate: orderDate,
//     //             $push: {
//     //                 causeListEntries: { ...cEntry, actionAbstract: actionAbstract, orderDate: orderDate }
//     //             }
//     //         },
//     //             { new: true });
//     //     }
//     // }

//     // const caseFileData = await Case.findById(id);
//     // if (employeeFile["Case Title"] || employeeFile["Case Title"] === '')
//     // updatedCase = await EmployeeData.findByIdAndUpdate(id, { ...employeeFile, id }, { new: true });
//     // console.log("title received" + caseFile["Case Title"]);

//     // console.log("updated Case: ");
//     // console.log(updatedCase);
//     // res.json(updatedCase);
// };

// export const deleteEmployeeData = async (req, res) => {
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that ID');
//     await EmployeeData.findByIdAndRemove(id);
//     res.json({ message: 'Post deleted successfully' });
// }

// export const likeEmployeeData = async (req, res) => {
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that ID');

//     const employeeFile = await Case.findById(id);
//     const updatedEmployeeFile = await Case.findByIdAndUpdate(id, { likeCount: employeeFile.likeCount + 1 }, { new: true });

//     res.json(updatedEmployeeFile);
// }

export default router;
