import { configureStore } from '@reduxjs/toolkit';
import documentsSlice from "./editor/slice.ts"

export const store = configureStore({
    reducer: {
        [documentsSlice.reducerPath]: documentsSlice.reducer
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>