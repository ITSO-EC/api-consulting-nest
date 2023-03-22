import * as mongoose from 'mongoose';

export const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: false },
    isVisible: { type: Boolean, required: true },
    view: { type: mongoose.Types.ObjectId, ref: "View", required: true },
    
});
