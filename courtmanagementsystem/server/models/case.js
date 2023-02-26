import mongoose from 'mongoose';

const caseSchema = new mongoose.Schema({
    title: String,
    caseNumber: String,
    caseType: String,
    caseSubType: String,
    FIR: {
        type: Number,
        default: null
    },
    FIRdate: {
        type: Date,
        default: null
    },
    underSection: {
        type: String,
        default: null
    },
    policeStation: String,
    institutionDate: {
        type: Date,
        default: new Date()
    },
    disposalDate: Date,
    isTranferedIn: Boolean,
    transferedInDate: Date,
    likeCount: {
        type: Number,
        default: 0
    }
});

const Case = mongoose.model('Case', caseSchema, 'cases');

export default Case;