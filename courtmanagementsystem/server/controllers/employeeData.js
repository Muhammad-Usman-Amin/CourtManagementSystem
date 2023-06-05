import mongoose from 'mongoose';
import EmployeeData from "../models/employeeData.js";
import express from 'express';

const router = express.Router();



export const getEmployeeData = async (req, res) => {
    try {
        const employeesData = await EmployeeData.find();

        res.status(200).json(employeesData);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createEmployeeData = async (req, res) => {

    // const { title, caseNumber, caseType, caseSubType, FIR, FIRdate, UnderSection, policeStation, institutionDate, disposalDate, isTransferedIn } = req.body;
    // const newCase = new Case({ title, caseNumber, caseType, caseSubType, FIR, FIRdate, UnderSection, policeStation, institutionDate, disposalDate, isTransferedIn });

    const { body } = req;
    // console.log(body);
    const { name, designation, dutyAs, attachedToCourt, fatherName, dateOfBirth, gender, currentAddress, permanentAddress, sameAsCurrentAddress,
        email, mobileNumber, maritalStatus, promotions, initialAppointmentAs,
        dateOfInitialAppointment, appointedOnAnySonQuota, fatherDesignation, fatherDateOfRetirement,
        transferHistory, children, nearestStationToHome, nearestStationToHomeC1, nearestStationToHomeC2, nearestStationToHomeC3,
        IsSufferingFromDisease, highestQualification, professionalQualification, computerLiteracy, computerLiteracyLevel, extraSkill } = body;
    // console.log(caseTitle);

    const newEmployeeFile = new EmployeeData({
        name, designation, dutyAs, attachedToCourt, fatherName, dateOfBirth, gender, currentAddress, permanentAddress, sameAsCurrentAddress,
        email, mobileNumber, maritalStatus, promotions, initialAppointmentAs,
        dateOfInitialAppointment, appointedOnAnySonQuota, fatherDesignation, fatherDateOfRetirement,
        transferHistory, children, nearestStationToHome, nearestStationToHomeC1, nearestStationToHomeC2, nearestStationToHomeC3,
        IsSufferingFromDisease, highestQualification, professionalQualification, computerLiteracy, computerLiteracyLevel, extraSkill
    });

    try {
        await newEmployeeFile.save();
        res.status(201).json(newEmployeeFile);
    } catch (error) {
        res.status(409).json({ error });
    }
}

export const updateEmployeeData = async (req, res) => {
    const { id } = req.params;
    const employeeFile = req.body;
    // console.log(caseFile);

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that ID');

    const { orderDate, orderNumber, nextDate, actionAbstract } = req.body;

    const theCase = await EmployeeData.findById(id);
    let updatedCase = null;

    const lastCase = theCase.causeListEntries.toObject();
    const cEntry = lastCase[lastCase.length - 1];
    // console.log(cEntry);

    if (new Date(theCase.orderDate).toDateString() === new Date().toDateString()) {

        //$set query  
        // console.log("$set Query");


        if (orderNumber || orderNumber === '') {
            // console.log("1 order number: " + orderNumber);
            updatedCase = await EmployeeData.findByIdAndUpdate(id, {
                orderNumber: orderNumber, orderDate: orderDate,
                $set: {
                    [`causeListEntries.${theCase.causeListEntries.length - 1}`]: { ...cEntry, orderNumber: orderNumber, orderDate: orderDate }
                }
            },
                { new: true });
        }

        if (nextDate) {
            // console.log("2 next date: " + nextDate);
            updatedCase = await EmployeeData.findByIdAndUpdate(id, {
                nextDate: nextDate, orderDate: orderDate,
                $set: {
                    [`causeListEntries.${theCase.causeListEntries.length - 1}`]: { ...cEntry, nextDate: nextDate, orderDate: orderDate }
                }
            },
                { new: true });

        }

        if (actionAbstract) {
            // console.log("3 action abstract: " + actionAbstract);
            updatedCase = await EmployeeData.findByIdAndUpdate(id, {
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
            updatedCase = await EmployeeData.findByIdAndUpdate(id, {
                orderNumber: orderNumber, orderDate: orderDate,
                $push: {
                    causeListEntries: { ...cEntry, orderNumber: orderNumber, orderDate: orderDate }
                }
            },
                { new: true });
        }
        if (nextDate) {
            // console.log("2 next date: " + nextDate);
            updatedCase = await EmployeeData.findByIdAndUpdate(id, {
                nextDate: nextDate, orderDate: orderDate,
                $push: {
                    causeListEntries: { ...cEntry, nextDate: nextDate, orderDate: orderDate }
                }
            },
                { new: true });
        }

        if (actionAbstract) {
            // console.log("3 action abstract: " + actionAbstract);
            updatedCase = await EmployeeData.findByIdAndUpdate(id, {
                actionAbstract: actionAbstract, orderDate: orderDate,
                $push: {
                    causeListEntries: { ...cEntry, actionAbstract: actionAbstract, orderDate: orderDate }
                }
            },
                { new: true });
        }
    }

    // const caseFileData = await Case.findById(id);
    if (employeeFile["Case Title"] || employeeFile["Case Title"] === '')
        updatedCase = await EmployeeData.findByIdAndUpdate(id, { ...employeeFile, id }, { new: true });
    // console.log("title received" + caseFile["Case Title"]);

    console.log("updated Case: ");
    console.log(updatedCase);
    res.json(updatedCase);
};

export const deleteEmployeeData = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that ID');
    await EmployeeData.findByIdAndRemove(id);
    res.json({ message: 'Post deleted successfully' });
}

export const likeEmployeeData = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that ID');

    const employeeFile = await Case.findById(id);
    const updatedEmployeeFile = await Case.findByIdAndUpdate(id, { likeCount: employeeFile.likeCount + 1 }, { new: true });

    res.json(updatedEmployeeFile);
}

export default router;