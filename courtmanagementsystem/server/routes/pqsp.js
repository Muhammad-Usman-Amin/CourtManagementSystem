import express from 'express';
import { getCases } from '../controllers/pqsp.js';

const router = express.Router();


// directory to localhost:5000/pqsp

router.get('/', getCases);
// router.post('/', createCase);
// router.patch('/:id', updateCase);
// router.delete('/:id', deleteCase);
// router.patch('/:id/likeCase', likeCase);

export default router;