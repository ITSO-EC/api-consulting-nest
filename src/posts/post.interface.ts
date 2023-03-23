import { Document } from 'mongoose';

export interface IPost extends Document {
    id?: string;
    title: string;
    ro: string;
    typeReform: string;
    fileUrl: string;
    legalRegulation: string;
    content: string;
    number: string;
    type: string;
    status: string;
    isVisible: string;
    reference: string;
    category: string;
}
