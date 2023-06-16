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
    const { ["Case Title"]: caseTitle, ["Case No"]: caseNo, ["Case Type"]: caseType,
        ["Category Per PQS"]: categoryPerPQS, ["FIR NO"]: FIRNO, ["FIR Date"]: FIRDate, Thana, Section,
        ["Date of Institution "]: dateOfInstitution, ["Date of Disposal Transfer Out"]: dateOfDisposalTransferOut,
        ["Disposal OR Transfer Out Flag"]: disposalOrTransferOutFlag, ["Disposal Mode Flag"]: disposalModeFlaq,
        ["Date of Transfer In"]: dateOfTransferIn, ["Date of Other Institution"]: dateOfOtherInstitution,
        ["Institution Flag"]: institutionFlag, nextDate: nextDate, actionAbstract: actionAbstract, orderDate: orderDate, orderNumber,
    } = body;
    console.log(caseTitle);
    // { body["Case Title"], body["Case No"], body["Case Type"], body["Category Per PQS"], body["FIR NO"], body["FIR Date"], body.underSection, body.policeStation, body["Date of Institution "], body["Date of Disposal"], body.isTransferedIn, body["Date of Transfer In"]});
    const newCase = new Case({
        ["Case Title"]: caseTitle, ["Case No"]: caseNo, ["Case Type"]: caseType,
        ["Category Per PQS"]: categoryPerPQS, ["FIR NO"]: FIRNO, ["FIR Date"]: FIRDate, Thana, Section,
        ["Date of Institution "]: dateOfInstitution, ["Date of Disposal Transfer Out"]: dateOfDisposalTransferOut,
        ["Disposal OR Transfer Out Flag"]: disposalOrTransferOutFlag, ["Disposal Mode Flag"]: disposalModeFlaq,
        ["Date of Transfer In"]: dateOfTransferIn, ["Date of Other Institution"]: dateOfOtherInstitution,
        ["Institution Flag"]: institutionFlag, nextDate: nextDate, actionAbstract: actionAbstract, orderDate: orderDate, orderNumber,
    });

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
    // console.log(caseFile);

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that ID');

    const { orderDate, orderNumber, nextDate, actionAbstract } = req.body;

    const theCase = await Case.findById(id);
    let updatedCase = null;

    const lastCase = theCase.causeListEntries.toObject();
    const cEntry = lastCase[lastCase.length - 1];
    // console.log(cEntry);

    if (new Date(theCase.orderDate).toDateString() === new Date().toDateString()) {

        //$set query  
        // console.log("$set Query");


        if (orderNumber || orderNumber === '') {
            // console.log("1 order number: " + orderNumber);
            updatedCase = await Case.findByIdAndUpdate(id, {
                orderNumber: orderNumber, orderDate: orderDate,
                $set: {
                    [`causeListEntries.${theCase.causeListEntries.length - 1}`]: { ...cEntry, orderNumber: orderNumber, orderDate: orderDate }
                }
            },
                { new: true });
        }

        if (nextDate) {
            // console.log("2 next date: " + nextDate);
            updatedCase = await Case.findByIdAndUpdate(id, {
                nextDate: nextDate, orderDate: orderDate,
                $set: {
                    [`causeListEntries.${theCase.causeListEntries.length - 1}`]: { ...cEntry, nextDate: nextDate, orderDate: orderDate }
                }
            },
                { new: true });

        }

        if (actionAbstract) {
            // console.log("3 action abstract: " + actionAbstract);
            updatedCase = await Case.findByIdAndUpdate(id, {
                actionAbstract: actionAbstract, orderDate: orderDate,
                $set: {
                    [`causeListEntries.${theCase.causeListEntries.length - 1}`]: { ...cEntry, actionAbstract: actionAbstract, orderDate: orderDate }
                }
            },
                { new: true });

        }

    } else {

        // $push query
        // console.log("$push Query");

        if (orderNumber || orderNumber === '') {
            // console.log("1 order number: " + orderNumber);
            updatedCase = await Case.findByIdAndUpdate(id, {
                orderNumber: orderNumber, orderDate: orderDate,
                $push: {
                    causeListEntries: { ...cEntry, orderNumber: orderNumber, orderDate: orderDate }
                }
            },
                { new: true });
        }
        if (nextDate) {
            // console.log("2 next date: " + nextDate);
            updatedCase = await Case.findByIdAndUpdate(id, {
                nextDate: nextDate, orderDate: orderDate,
                $push: {
                    causeListEntries: { ...cEntry, nextDate: nextDate, orderDate: orderDate }
                }
            },
                { new: true });
        }

        if (actionAbstract) {
            // console.log("3 action abstract: " + actionAbstract);
            updatedCase = await Case.findByIdAndUpdate(id, {
                actionAbstract: actionAbstract, orderDate: orderDate,
                $push: {
                    causeListEntries: { ...cEntry, actionAbstract: actionAbstract, orderDate: orderDate }
                }
            },
                { new: true });
        }
    }

    // const caseFileData = await Case.findById(id);
    if (caseFile["Case Title"] || caseFile["Case Title"] === '')
        updatedCase = await Case.findByIdAndUpdate(id, { ...caseFile, id }, { new: true });
    // console.log("title received" + caseFile["Case Title"]);

    console.log("updated Case: ");
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