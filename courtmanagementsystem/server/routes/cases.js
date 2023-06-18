import express from "express";
import {
  getCases,
  createCase,
  updateCase,
  deleteCase,
  likeCase,
} from "../controllers/cases.js";

const router = express.Router();

// directory to localhost:5000/cases

router.get("/", getCases);
router.post("/", createCase);
router.patch("/:id", updateCase);
router.delete("/:id", deleteCase);
router.patch("/:id/likeCase", likeCase);

export default router;
