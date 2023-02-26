import mongoose from 'mongoose';

const pqspSchema = new mongoose.Schema({
    "SNo": String, "Case No": String, "Case Title": String,
    "Court Level": String, "Case Type": String, "Category Per PQS": String,
    "Date of Institution ": String, "Date of Transfer In": String, "Date of Other Institution": String,
    "Institution Flag": String, "Date of Disposal Transfer Out": String, "Disposal OR Transfer Out Flag": String,
    "Disposal Mode Flag": "", "Current Pendency Stage": String, "Remarks": String,
    "Institution Status": String, "Submitted By": String,
    "Submitted On": String, "Institution Year": String,
    "PendingStatus": String, "PID": String, "Pname": String,
    "CourtID": String, "Station": String, "MonthYear": String,
    "Related To": String, "Thana": String, "Designation": String,
    "Court Status": String, "TehsilCode": String, "DIstrictCOde": String, "Council Party 1": String,
    "Council Party 2": String, "Act": String, "Section": String, "Next Hearing Date": String, "FIR NO": String, "FIR Date": String,
    "Zone": String, "Is UTP Case": String, "Date _When case was put to Trial (dd-mmm-yyyy)": String,
    "Male": String, "Female": String, "Juvenile": String, "Total UTPS": String, "65 Years & Above in Total#": String,
    "Remaining Witness to be Examined": String, "Last _Hearing Date_(dd-mm-yyyy)": String,
    "Number of hearing since case is put in trial": String, "Number of hearing since case is in current stage": String,
    "Reason for _Delay or No Proceedings": String, "If, Other _then write down the detail": String,
    "Incumbency Status": String,
    "Judge Designation Categaries": String,
    "AcquittalORConviction": String
});

const Pqsp = mongoose.model('Pqsp', pqspSchema, 'PQSP');

export default Pqsp;