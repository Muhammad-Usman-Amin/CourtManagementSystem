// import express from 'express';
// import { getCauseLists, createCauseList } from '../controllers/causeLists.js';

// const router = express.Router();


// // directory to localhost:5000/posts

// router.get('/', getCauseLists);
// router.post('/', createCauseList);

// export default router;
import express from 'express';
import {
    getCauseList,
    // createEmployeeData, updateEmployeeData,
    // deleteEmployeeData, likeEmployeeData
} from '../controllers/causeLists.js';

const router = express.Router();


// directory to localhost:5000/cases

router.get('/', getCauseList);
// router.post('/', createEmployeeData);
// router.patch('/:id', updateEmployeeData);
// router.delete('/:id', deleteEmployeeData);
// router.patch('/:id/likeCase', likeEmployeeData);

export default router;