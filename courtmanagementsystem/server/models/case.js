import mongoose from 'mongoose';

const caseSchema = mongoose.Schema({
    title: String,
    caseNumber: Number,
    caseType: String,
    FIR: {
        type: Number,
        default: 0
    },
    FIRdate: {
        type: Date,
        default: new Date()
    },
    UnderSection: {
        type: String,
        default: ''
    },
    institutionDate: {
        type: Date,
        default: new Date()
    },
    disposalDate: {
        type: Date,
        default: new Date()
    },
    isTranferedIn: Boolean,
    transferedInDate: {
        type: Date,
        default: new Date()
    }
});

const Case = mongoose.model('Case', caseSchema);

export default Case;