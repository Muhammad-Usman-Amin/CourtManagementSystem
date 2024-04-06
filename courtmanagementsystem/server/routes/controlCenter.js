import express from "express";
import {
  getPoData,
} from "../controllers/controlCenter.js";

const router = express.Router();

// directory to localhost:5000/cases

router.get("/", getPoData);
// router.post("/", createCase);
// router.patch("/:id", updateCase);
// router.delete("/:id", deleteCase);
// router.patch("/:id/likeCase", likeCase);

export default router;
