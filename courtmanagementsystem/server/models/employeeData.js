import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema(
    {
        name: String,
        attachedToCourt: String,
        designation: String,
        dutyAs: String,
        fatherName: String,
        dateOfBirth: Date,
        currentAddress: String,
        permanentAddress: String,
        email: String,
        mobileNumber: String,
        maritalStatus: String,
        dateOfFirstPromotion: Date,
        firstPromotionToThePostOf: String,
        dateOfSecondPromotion: Date,
        secondPromotionToThePostOf: String,
        dateOfThirdPromotion: Date,
        thirdPromotionToThePostOf: String,
        initialAppointmentAs: String,
        dateOfInitialAppointment: Date,
        appointedOnAnySonQuota: Boolean,
        fatherDesignation: String,
        fatherDateOfRetirement: Date,
        numberOfChildren: String,
        detilsOfChildren: [],
        nearestStationToHome: String,
        stationChoice: {},
        transferHistory: [],
        sufferingFromDisease: Boolean,
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