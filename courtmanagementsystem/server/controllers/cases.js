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

    // const { title, caseNumber, caseType, caseSubType, FIR, FIRdate, UnderSection, policeStation, institutionDate, disposalDate, isTransferedIn } = req.body;
    // const newCase = new Case({ title, caseNumber, caseType, caseSubType, FIR, FIRdate, UnderSection, policeStation, institutionDate, disposalDate, isTransferedIn });

    const { body } = req;
    console.log(body);
    const { ["Case Title"]: caseTitle, ["Case No"]: caseNo, ["Case Type"]: caseType, ["Category Per PQS"]: categoryPerPQS, ["FIR NO"]: FIRNO, ["FIR Date"]: FIRDate, Thana, Section, ["Date of Institution "]: dateOfInstitution, ["Date of Disposal Transfer Out"]: dateOfDisposalTransferOut, ["Disposal OR Transfer Out Flag"]: disposalOrTransferOutFlag, ["Disposal Mode Flag"]: disposalModeFlaq, ["Date of Transfer In"]: dateOfTransferIn, ["Date of Other Institution"]: dateOfOtherInstitution, ["Institution Flag"]: institutionFlag } = body;
    console.log(caseTitle);
    // { body["Case Title"], body["Case No"], body["Case Type"], body["Category Per PQS"], body["FIR NO"], body["FIR Date"], body.underSection, body.policeStation, body["Date of Institution "], body["Date of Disposal"], body.isTransferedIn, body["Date of Transfer In"]});
    const newCase = new Case({ ["Case Title"]: caseTitle, ["Case No"]: caseNo, ["Case Type"]: caseType, ["Category Per PQS"]: categoryPerPQS, ["FIR NO"]: FIRNO, ["FIR Date"]: FIRDate, Thana, Section, ["Date of Institution "]: dateOfInstitution, ["Date of Disposal Transfer Out"]: dateOfDisposalTransferOut, ["Disposal OR Transfer Out Flag"]: disposalOrTransferOutFlag, ["Disposal Mode Flag"]: disposalModeFlaq, ["Date of Transfer In"]: dateOfTransferIn, ["Date of Other Institution"]: dateOfOtherInstitution, ["Institution Flag"]: institutionFlag });

    try {
        await newCase.save();
        res.status(201).json(newCase);
    } catch (error) {
        res.status(409).json({ error });
    }
}

export const updateCase = async (req, res) => {
    const { id } = req.params;
    // const caseFile = req.body;
    // console.log(caseFile);

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that ID');

    const { orderDate, orderNumber, nextDate, actionAbstract } = req.body;

    // const caseFileData = await Case.findById(id);

    // const updatedCase = await Case.findByIdAndUpdate(id, { ...caseFile, id }, { new: true });

    // console.log("64: " + orderDate);
    const theCase = await Case.findById(id);
    let updatedCase = null;

    // console.log("68: " + new Date(theCase.orderDate).toDateString());
    // console.log("69: " + new Date().toDateString());

    console.log((new Date(theCase.orderDate).toDateString() === new Date().toDateString()))
    console.log(theCase.causeListEntries.length);
    const sqtt = `causeListEntries.${theCase.causeListEntries.length - 1}`;
    console.log(sqtt);

    if (new Date(theCase.orderDate).toDateString() === new Date().toDateString()) {
        // $set query  
        console.log("$set Query");
        updatedCase = await Case.findByIdAndUpdate(id, {
            nextDate: nextDate, actionAbstract: actionAbstract, orderDate: orderDate,
            $set: {
                [`causeListEntries.${theCase.causeListEntries.length - 1}`]: { orderNumber: orderNumber, nextDate: nextDate, actionAbstract: actionAbstract }
            }
        },
            { new: true });

    } else {
        console.log("$push Query");
        // $push query
        updatedCase = await Case.findByIdAndUpdate(id, {
            nextDate: nextDate, actionAbstract: actionAbstract, orderDate: orderDate,
            $push: {
                causeListEntries: { orderNumber: orderNumber, nextDate: nextDate, actionAbstract: actionAbstract }
            }
        },
            { new: true });
    }
    console.log(updatedCase);
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