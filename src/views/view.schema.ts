import * as mongoose from 'mongoose';
import * as mongoPaginate from 'mongoose-paginate-v2';
import { toJSON } from 'src/commons/plugins/toJSON.plugins';

export const ViewSchema = new mongoose.Schema({
    name: { type: String, required: true },
    imageUrl: { type: String, required: false },
    isVisible: { type: Boolean, required: true },
}, { timestamps: true });

ViewSchema.plugin(mongoPaginate);
ViewSchema.plugin(toJSON);
