import express from 'express';
import { getPosts, createPost } from '../controllers/posts.js';

const router = express.Router();


// directory to localhost:5000/posts

router.get('/', getPosts);
router.post('/', createPost);

export default router;