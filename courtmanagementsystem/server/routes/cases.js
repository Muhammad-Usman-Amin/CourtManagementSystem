import express from "express";
import multer from "multer";
import {
  getCases,
  createCase,
  updateCase,
  deleteCase,
  likeCase,
  uploadCSV,
  getCourts,
  getCasesByCourtCode,
} from "../controllers/cases.js";

const router = express.Router();

// Setup multer for file uploads
const upload = multer({ 
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'text/csv' || file.originalname.endsWith('.csv')) {
      cb(null, true);
    } else {
      cb(new Error('Only CSV files are allowed'), false);
    }
  }
});

// directory to localhost:5000/cases

router.get("/", getCases);
router.get("/courts", getCourts);
router.get("/by-court/:courtCode", getCasesByCourtCode);
router.post("/", createCase);
router.post("/upload", upload.single("file"), uploadCSV);
router.patch("/:id", updateCase);
router.delete("/:id", deleteCase);
router.patch("/:id/likeCase", likeCase);

export default router;
