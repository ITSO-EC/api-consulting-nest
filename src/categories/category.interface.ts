import { View } from "src/views/view.interface";
import { Document } from 'mongoose';

export interface Category extends Document {
    id?: string;
    name: string;
    description: string;
    imageUrl?: string;
    isVisible: boolean;
    status: string;
    view: View;
}
