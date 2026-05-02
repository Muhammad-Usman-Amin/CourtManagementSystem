import mongoose from "mongoose";
import poData from "../models/controlCenter.js";
import express from "express";

const router = express.Router();

export const getPoData = async (req, res) => {
  try {
    const data = await poData.findOne();

    if (!data) {
      return res.status(404).json({
        message: "Control Center data not found",
      });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createPoData = async (req, res) => {
  // console.log("createPoData called: body: ", req.body);

  try {
    const body = req.body;

    // STEP 1: check if record already exists
    const existingRecord = await poData.findOne();

    // STEP 2: IF EXISTS → UPDATE
    if (existingRecord) {
      const updated = await poData.findByIdAndUpdate(
        existingRecord._id,
        { $set: body },
        { new: true }
      );

      return res.status(200).json({
        message: "Control Center updated successfully",
        data: updated,
      });
    }

    // STEP 3: IF NOT EXISTS → CREATE
    const newRecord = new poData(body);
    await newRecord.save();

    return res.status(201).json({
      message: "Control Center created successfully",
      data: newRecord,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// export const getPoData = async (req, res) => {
//   // const query = req.query;
//   console.log('getpodata called');

//   try {
//     const poDataFile = await poData.find();
//     return res.status(200).json(poDataFile);
//   } catch (error) {
//     return res.status(404).json({ message: error.message });
//   }
// };

// export const createPoData = async (req, res) => {
//   console.log('createPoData called');

//   const { body } = req;
//   let monthlyDataFile = null;
//   const {
//     presidingOfficer,
//     causeListName,
//     causeListEnglishName,
//     designation,
//     judgeCategory,
//     courtNumber,
//     stationDistrict,
//     backlogDate,
//     familyCasesBacklogDate,
//     courtStatus, //use for Regular, CPC, FamilyCourt etc
//     monthlyData,
//     // monthlyData: [{
//     //   statementMonth,
//     //   totalDays,
//     //   totalSundays,
//     //   leaves,
//     //   otherHolidays,
//     //   nonJudicialWorkingDays,
//     //   noOfStrikesDays,
//     //   netJudicialWorkingDays,
//     //   incumbencyStatus,
//     //   quartelrlyBacklogClearanceTarget,
//     // }],
//     themeMode,
//   } = body;

//   try {
//     const poDataFile = await poData.find();
//     monthlyDataFile = poDataFile.monthlyData.toObject();
//     console.log(monthlyDataFile);
    
//   } catch (error) {
//     return res.status(409).json({ error });
//   }

//   // console.log(body);

//   const newPoData = new poData({
//     presidingOfficer,
//     causeListName,
//     causeListEnglishName,
//     designation,
//     judgeCategory,
//     courtNumber,
//     stationDistrict,
//     backlogDate,
//     familyCasesBacklogDate,
//     courtStatus, //use for Regular, CPC, FamilyCourt etc
//     monthlyData,
//     // monthlyData: [
//     //   {
//     //   statementMonth,
//     //   totalDays,
//     //   totalSundays,
//     //   leaves,
//     //   otherHolidays,
//     //   nonJudicialWorkingDays,
//     //   noOfStrikesDays,
//     //   netJudicialWorkingDays,
//     //   incumbencyStatus,
//     //   quartelrlyBacklogClearanceTarget,
//     // }],
//     themeMode
//   });

//   try {
//     await newPoData.save();
//     res.status(201).json(newPoData);
//   } catch (error) {
//     return res.status(409).json({ error });
//   }
// };

// export const updatePoData = async (req, res) => {
//   const { id } = req.params;
//   const poDataFile = req.body; // for PO data updating usage
//   // console.log("podata body: "+poDataFile);
//   // console.log(caseFile);

//   if (!mongoose.Types.ObjectId.isValid(id))
//     return res.status(404).send("No Presiding Officer data with that ID");

//   const updatedPoDataFile = await poData.findByIdAndUpdate(
//     id,
//     { ...poDataFile, id },
//     { new: true }
//   );
//   return res.json(updatedPoDataFile);
// };

// export const deletePoData = async (req, res) => {
//   const { id } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(id))
//     return res.status(404).send("No post with that ID");
//   await poData.findByIdAndRemove(id);
//   return res.json({ message: "Post deleted successfully" });
// };

export default router;
