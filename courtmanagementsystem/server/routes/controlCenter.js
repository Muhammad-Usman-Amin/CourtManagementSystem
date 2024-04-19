import express from "express";
import {
  getPoData, createPoData, updatePoData
} from "../controllers/controlCenter.js";

const router = express.Router();

// directory to localhost:5000/controlCenter

router.get("/", getPoData);
router.post("/", createPoData);
router.patch("/:id", updatePoData);
// router.delete("/:id", deleteCase);
// router.patch("/:id/likeCase", likeCase);

export default router;
