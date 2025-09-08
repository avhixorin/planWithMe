import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import planReducer from "./slices/planSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        plan: planReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;