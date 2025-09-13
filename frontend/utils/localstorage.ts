import type { PlansState } from "../src/redux/plansSlice";

const STATE_KEY = "weekendPlanner";

export const loadState = (): { weekendPlans: PlansState } | undefined => {
  try {
    const serializedState = localStorage.getItem(STATE_KEY);
    if (serializedState === null) {
      return undefined; 
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Could not load state from localStorage", err);
    return undefined;
  }
};

export const saveState = (state: { weekendPlans: PlansState }) => {
  try { 
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STATE_KEY, serializedState);
  } catch (err) {
    console.error("Could not save state to localStorage", err);
  }
};