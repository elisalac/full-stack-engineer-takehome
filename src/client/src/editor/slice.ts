import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDocuments } from "./model";

interface IDocumentsState {
    documents: IDocuments | null;
}

export default createSlice({
    name: "documents",
    initialState: { documents: null } as IDocumentsState,
    reducers: {
        setDocuments(state, action: PayloadAction<IDocuments>) {
            state.documents = action.payload;
        },
        addDocument(state, action: PayloadAction<{ id: string; name: string; data: any }>) {
            if (state.documents) {
                state.documents[action.payload.id] = {
                    name: action.payload.name,
                    data: action.payload.data,
                };
            }
        },
        updateDocument(state, action: PayloadAction<{ id: string; name?: string; data?: any }>) {
            if (state.documents && state.documents[action.payload.id]) {
                const doc = state.documents[action.payload.id];
                if (!action.payload.name) doc.name = action.payload.name;
                if (!action.payload.data) doc.data = action.payload.data;
            }
        },
        deleteDocument(state, action: PayloadAction<string>) {
            if (state.documents) {
                delete state.documents[action.payload];
            }
        },
    },
});