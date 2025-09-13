import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Activity, Plan } from "../../types/planTypes";

interface PlansState {
  plans: Plan[];
}

const initialState: PlansState = {
  plans: [],
};

const plansSlice = createSlice({
  name: "plans",
  initialState,
  reducers: {
    /**
     * Adds a new plan to the state.
     */
    addPlan: (state, action: PayloadAction<Plan>) => {
      state.plans.push(action.payload);
    },
    /**
     * Removes a plan from the state by its ID.
     */
    removePlan: (state, action: PayloadAction<string>) => {
      state.plans = state.plans.filter((plan) => plan.id !== action.payload);
    },
    /**
     * Updates an existing plan.
     */
    updatePlan: (state, action: PayloadAction<Plan>) => {
      const index = state.plans.findIndex(
        (plan) => plan.id === action.payload.id
      );
      if (index !== -1) {
        state.plans[index] = action.payload;
      }
    },
    /**
     * Adds an activity to an existing plan, identified by the plan's ID.
     */
    addActivityToPlan: (
      state,
      action: PayloadAction<{ id: string; activity: Activity }>
    ) => {
      const { id, activity } = action.payload;
      const plan = state.plans.find((p) => p.id === id);
      // Ensure the plan exists and the activity is not already in it.
      if (plan && !plan.activities.some(a => a.id === activity.id)) {
        plan.activities.push(activity);
      }
    },
  },
});

export const { addPlan, removePlan, updatePlan, addActivityToPlan } =
  plansSlice.actions;

export default plansSlice.reducer;