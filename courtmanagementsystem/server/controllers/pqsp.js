import mongoose from 'mongoose';
import Pqsp from "../models/pqsp.js";
import express from 'express';

const router = express.Router();



export const getCases = async (req, res) => {
    try {
        const cases = await Pqsp.find();

        res.status(200).json(cases);
    } catch (error) {
        res.status(404).json({ error });
    }
}

// export const createCase = async (req, res) => {
//     const { title, caseNumber, caseType, caseSubType, FIR, FIRdate, UnderSection, institutionDate, disposalDate, isTransferedIn } = req.body;
//     const newCase = new Pqsp({ title, caseNumber, caseType, caseSubType, FIR, FIRdate, UnderSection, institutionDate, disposalDate, isTransferedIn });

//     try {
//         await newCase.save();
//         res.status(201).json(newCase);
//     } catch (error) {
//         res.status(409).json({ error });
//     }
// }

// export const updateCase = async (req, res) => {
//     const { id } = req.params;
//     const caseFile = req.body;
//     // console.log(post);

//     if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that ID');

//     const updatedCase = await Pqsp.findByIdAndUpdate(id, { ...caseFile, id }, { new: true });

//     res.json(updatedCase);
// };

// export const deleteCase = async (req, res) => {
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that ID');
//     await Pqsp.findByIdAndRemove(id);
//     res.json({ message: 'Post deleted successfully' });
// }

// export const likeCase = async (req, res) => {
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that ID');

//     const caseFile = await Pqsp.findById(id);
//     const updatedCase = await Pqsp.findByIdAndUpdate(id, { likeCount: caseFile.likeCount + 1 }, { new: true });

//     res.json(updatedCase);
// }

export default router;