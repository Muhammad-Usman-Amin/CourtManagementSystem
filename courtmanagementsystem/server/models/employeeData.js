import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema(
    {
        name: String,
        designation: String,
        attachedToCourt: String,
        dutyAs: String,
        fatherName: String,
        dateOfBirth: Date,
        currentAddress: String,
        permanentAddress: String,
        email: String,
        mobileNumber: String,
        maritalStatus: String,
        gender: String,
        initialAppointmentAs: String,
        dateOfInitialAppointment: Date,
        appointedOnAnySonQuota: Boolean,
        fatherDesignation: String,
        fatherDateOfRetirement: Date,
        promotions: [{ dateOfPromotion: Date, promotionTo: String }],
        transferHistory: [{ fromCourt: String, toCourt: String, dateOfTransfer: Date }],
        children: [{ name: String, dob: Date, gender: String, maritalStatus: String }],
        nearestStationToHome: String,
        nearestStationToHomeC1: String,
        nearestStationToHomeC2: String,
        nearestStationToHomeC3: String,
        IsSufferingFromDisease: Boolean,
        highestQualification: String,
        professionalQualification: String,
        computerLiteracy: Boolean,
        computerLiteracyLevel: String,
        extraSkill: String,
        // ["Case Title"]: String,
        // ["Case No"]: String,
        // ["Case Type"]: String,
        // ["Category Per PQS"]: String,
        // ["FIR NO"]: String,
        // ["FIR Date"]: Date,
        // Thana: String,
        // Section: String,
        // ["Date of Institution "]: Date,
        // ["Date of Disposal Transfer Out"]: Date,
        // ["Disposal OR Transfer Out Flag"]: String,
        // ["Disposal Mode Flag"]: String,
        // ["Date of Transfer In"]: Date,
        // ["Date of Other Institution"]: Date,
        // ["Institution Flag"]: Date,

        // orderNumber: String,
        // nextDate: Date,
        // actionAbstract: String,
        // orderDate: { type: Date, default: new Date() },
        // causeListEntries: [
        //     {
        //         orderNumber: String,
        //         orderDate: { type: Date, default: new Date() },
        //         nextDate: Date,
        //         actionAbstract: String,
        //     }
        // ],
        // likeCount: {
        //     type: Number,
        //     default: 0
        // },
    });

const EmployeesData = mongoose.model('EmployeesData', employeeSchema, 'EmployeesData');

export default EmployeesData;