import { View } from "src/views/view.interface";

export interface Category {
    id?: string;
    name: string;
    description: string;
    imageUrl?: string;
    isVisible: boolean;
    view: View;
}
