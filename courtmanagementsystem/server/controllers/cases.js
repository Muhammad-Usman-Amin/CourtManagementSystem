import mongoose from 'mongoose';
import Case from "../models/case.js";
import express from 'express';

const router = express.Router();



export const getCases = async (req, res) => {
    try {
        const cases = await Case.find();

        res.status(200).json(cases);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createCase = async (req, res) => {
    const { title, caseNumber, caseType, caseSubType, FIR, FIRdate, UnderSection, policeStation, institutionDate, disposalDate, isTransferedIn } = req.body;
    const newCase = new Case({ title, caseNumber, caseType, caseSubType, FIR, FIRdate, UnderSection, policeStation, institutionDate, disposalDate, isTransferedIn });

    try {
        await newCase.save();
        res.status(201).json(newCase);
    } catch (error) {
        res.status(409).json({ error });
    }
}

export const updateCase = async (req, res) => {
    const { id } = req.params;
    const caseFile = req.body;
    // console.log(post);

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that ID');

    const updatedCase = await Case.findByIdAndUpdate(id, { ...caseFile, id }, { new: true });

    res.json(updatedCase);
};

export const deleteCase = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that ID');
    await Case.findByIdAndRemove(id);
    res.json({ message: 'Post deleted successfully' });
}

export const likeCase = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that ID');

    const caseFile = await Case.findById(id);
    const updatedCase = await Case.findByIdAndUpdate(id, { likeCount: caseFile.likeCount + 1 }, { new: true });

    res.json(updatedCase);
}

export default router;