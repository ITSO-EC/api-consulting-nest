import * as mongoose from 'mongoose';

export const ViewSchema = new mongoose.Schema({
    name: { type: String, required: true },
    imageUrl: { type: String, required: false },
    isVisible: { type: Boolean, required: true },
});
