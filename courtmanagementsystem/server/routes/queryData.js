import express from 'express';
import {
    getQueryData,
    // createEmployeeData, updateEmployeeData,
    // deleteEmployeeData, likeEmployeeData
} from '../controllers/queryData.js';

const router = express.Router();


// directory to localhost:5000/cases

router.get('/', getQueryData);
// router.post('/', createEmployeeData);
// router.patch('/:id', updateEmployeeData);
// router.delete('/:id', deleteEmployeeData);
// router.patch('/:id/likeCase', likeEmployeeData);

export default router;