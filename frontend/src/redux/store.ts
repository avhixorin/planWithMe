import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import planReducer from "./slices/planSlice";
import { componentSlice } from "./slices/componentSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        plan: planReducer,
        componentSlice: componentSlice.reducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;