import express from 'express';
import { getCases, createCase } from '../controllers/cases.js';

const router = express.Router();


// directory to localhost:5000/posts

router.get('/', getCases);
router.post('/', createCase);

export default router;