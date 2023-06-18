import express from "express";
import {
  getEmployeeData,
  createEmployeeData,
  updateEmployeeData,
  deleteEmployeeData,
  likeEmployeeData,
} from "../controllers/employeeData.js";

const router = express.Router();

// directory to localhost:5000/cases

// router.get('/api/queryData', getQueryData);
router.get("/", getEmployeeData);
router.post("/", createEmployeeData);
router.patch("/:id", updateEmployeeData);
router.delete("/:id", deleteEmployeeData);
router.patch("/:id/likeCase", likeEmployeeData);

export default router;
