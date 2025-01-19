import { Delta } from "quill";

export interface IDocument {
    id: string;
    name: string;
    data: Delta;
}

export type IDocuments = IDocument[];