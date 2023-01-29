import mongoose from 'mongoose';

const causeListSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
});

const CauseList = mongoose.model('CauseList', causeListSchema);

export default CauseList;