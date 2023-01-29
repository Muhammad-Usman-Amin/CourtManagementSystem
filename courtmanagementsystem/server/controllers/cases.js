import Case from "../models/case.js";



export const getCases = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();

        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createCase = (req, res) => {
    const body = req.body
    try {

    } catch (error) {

    }
}