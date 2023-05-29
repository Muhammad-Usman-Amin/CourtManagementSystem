import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema(
    {
        name: String, fatherName: String,
        dateOfBirth: { type: Date, default: new Date() },
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

const EmployeeData = mongoose.model('EmployeesData', employeeSchema, 'EmployeeData');

export default EmployeeData;