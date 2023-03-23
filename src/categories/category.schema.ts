import * as mongoose from 'mongoose';
import * as mongoPaginate from 'mongoose-paginate-v2';
import { toJSON } from 'src/commons/plugins/toJSON.plugins';

export const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: false },
    isVisible: { type: Boolean, required: true },
    status: { type: String, required: true },
    view: { type: mongoose.Types.ObjectId, ref: "View", required: true },

}, { timestamps: true });

CategorySchema.plugin(mongoPaginate);
CategorySchema.plugin(toJSON);
