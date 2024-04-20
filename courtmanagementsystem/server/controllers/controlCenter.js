import mongoose from "mongoose";
import poData from "../models/controlCenter.js";
import express from "express";

const router = express.Router();

export const getPoData = async (req, res) => {
  // const query = req.query;
  console.log('getpodata called');

  try {
    const poDataFile = await poData.find();
    res.status(200).json(poDataFile);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPoData = async (req, res) => {

  const { body } = req;
  // console.log(body);
  const {
    presidingOfficer,
    causeListName,
    designation,
    judgeCategory,
    courtNumber,
    stationDistrict,
    courtStatus, //use for Regular, CPC, FamilyCourt etc
    monthlyData: [{
      statementMonth,
      totalDays,
      totalSundays,
      leaves,
      otherHolidays,
      nonJudicialWorkingDays,
      noOfStrikesDays,
      netJudicialWorkingDays,
      incumbencyStatus,
      quartelrlyBacklogClearanceTarget,
    }]
  } = body;

  const newPoData = new poData({
    presidingOfficer,
    causeListName,
    designation,
    judgeCategory,
    courtNumber,
    stationDistrict,
    courtStatus, //use for Regular, CPC, FamilyCourt etc
    monthlyData: [{
      statementMonth,
      totalDays,
      totalSundays,
      leaves,
      otherHolidays,
      nonJudicialWorkingDays,
      noOfStrikesDays,
      netJudicialWorkingDays,
      incumbencyStatus,
      quartelrlyBacklogClearanceTarget,
    }],
  });

  try {
    await newPoData.save();
    res.status(201).json(newPoData);
  } catch (error) {
    res.status(409).json({ error });
  }
};

export const updatePoData = async (req, res) => {
  const { id } = req.params;
  const poDataFile = req.body; // for PO data updating usage
  // console.log(caseFile);

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No Presiding Officer data with that ID");

  const updatedPoDataFile = await poData.findByIdAndUpdate(
    id,
    { ...poDataFile, id },
    { new: true }
  );
  res.json(updatedPoDataFile);
};

export const deletePoData = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that ID");
  await Case.findByIdAndRemove(id);
  res.json({ message: "Post deleted successfully" });
};

export default router;
