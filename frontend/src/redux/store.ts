import { configureStore } from "@reduxjs/toolkit";
import { throttle } from "lodash-es";
import plansReducer from "./plansSlice";
import { loadState, saveState } from "../../utils/localstorage";

const persistedState = loadState();

export const store = configureStore({
  reducer: {
    weekendPlans: plansReducer,
  },
  preloadedState: persistedState,
});

store.subscribe(
  throttle(() => {
    saveState({
      weekendPlans: store.getState().weekendPlans,
    });
  }, 1000)
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
