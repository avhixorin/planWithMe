import { configureStore } from "@reduxjs/toolkit";
import { throttle } from "lodash-es";
import userReducer from "./slices/userSlice";
import planReducer from "./slices/planSlice";
import { componentSlice } from "./slices/componentSlice";
import activityIdeasReducer from "./slices/activitiesSlice";
import plansReducer from "./plansSlice";
import { loadState, saveState } from "../../utils/localstorage";

const persistedState = loadState();

export const store = configureStore({
  reducer: {
    user: userReducer,
    plan: planReducer,
    weekendPlans: plansReducer,
    componentSlice: componentSlice.reducer,
    activityIdeas: activityIdeasReducer,
  },
  preloadedState: persistedState,
});

store.subscribe(
  throttle(() => {
    saveState({
      plan: store.getState().plan,
    });
  }, 1000)
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
