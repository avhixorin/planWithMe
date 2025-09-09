import type { PlanState } from "../src/redux/slices/planSlice";

// The key we'll use to store the state in localStorage
const STATE_KEY = "weekendPlannerState";

/**
 * Loads the plan state from localStorage.
 * Uses a try-catch block to handle cases where localStorage is unavailable
 * or the data is corrupted.
 */
export const loadState = (): { plan: PlanState } | undefined => {
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

/**
 * Saves the plan state to localStorage.
 * We only save the 'plan' slice to avoid storing other transient UI state.
 */
export const saveState = (state: { plan: PlanState }) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STATE_KEY, serializedState);
  } catch (err) {
    console.error("Could not save state to localStorage", err);
  }
};