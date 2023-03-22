import * as mongoose from 'mongoose';

export const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    ro: { type: String, required: true },
    typeReform: { type: String, required: true },
    fileUrl: { type: String, required: false },
    legalRegulation: { type: String, required: true },
    content: { type: String, required: true },
    number: { type: String, required: true },
    type: { type: String, required: true },
    // status: { type: String, required: true },
    reference: { type: String, required: true },
    category: { type: mongoose.Types.ObjectId, ref: "Category", required: true },
});
