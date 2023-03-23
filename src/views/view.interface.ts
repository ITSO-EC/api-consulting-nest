import { Document } from 'mongoose';

export interface View extends Document {
    id?: string;
    name: string;
    imageUrl?: string;
    isVisible: boolean;
    createdAt: Date;
    updatedAt: Date;
}
