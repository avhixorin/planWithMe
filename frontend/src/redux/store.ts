import { configureStore } from "@reduxjs/toolkit";
import { throttle } from "lodash-es";
import moodReducer from "./moodSlice";
import plansReducer from "./plansSlice";
import { loadState, saveState } from "../../utils/localstorage";

const persistedState = loadState();

export const store = configureStore({
  reducer: {
    mood: moodReducer,
    weekendPlans: plansReducer,
  },
  preloadedState: persistedState,
});

store.subscribe(
  throttle(() => {
    saveState({
      weekendPlans: store.getState().weekendPlans,
      mood: store.getState().mood,
    });
  }, 1000)
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
