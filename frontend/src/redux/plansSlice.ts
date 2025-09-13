import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Plan, ScheduledActivity } from "../../types/planTypes";

export interface PlansState {
  plans: Plan[];
}

const initialState: PlansState = {
  plans: [],
};

const plansSlice = createSlice({
  name: "plans",
  initialState,
  reducers: {
    addPlan: (state, action: PayloadAction<Plan>) => {
      state.plans.push(action.payload);
    },
    removePlan: (state, action: PayloadAction<string>) => {
      state.plans = state.plans.filter((plan) => plan.id !== action.payload);
    },
    removeActivityFromPlan: (
      state,
      action: PayloadAction<{ planId: string; activityId: string }>
    ) => {
      const { planId, activityId } = action.payload;
      const plan = state.plans.find((p) => p.id === planId);
      if (plan) {
        plan.activities = plan.activities.filter((a) => a.id !== activityId);
      }
    },
    updatePlan: (state, action: PayloadAction<Plan>) => {
      const index = state.plans.findIndex(
        (plan) => plan.id === action.payload.id
      );
      if (index !== -1) {
        state.plans[index] = action.payload;
      }
    },
    addActivityToPlan: (
      state,
      action: PayloadAction<{ id: string; activity: ScheduledActivity }>
    ) => {
      const { id, activity } = action.payload;
      const plan = state.plans.find((p) => p.id === id);
      if (plan && !plan.activities.some((a) => a.id === activity.id)) {
        plan.activities.push(activity);
      }
    },
    updateActivityInPlan: (
      state,
      action: PayloadAction<{
        planId: string;
        activityId: string;
        updates: Partial<ScheduledActivity>;
      }>
    ) => {
      const { planId, activityId, updates } = action.payload;
      const plan = state.plans.find((p) => p.id === planId);

      if (plan) {
        const activity = plan.activities.find((act) => act.id === activityId);
        if (activity) {
          Object.assign(activity, updates);
        }
      }
    },
  },
});

export const {
  addPlan,
  removePlan,
  updatePlan,
  addActivityToPlan,
  updateActivityInPlan,
  removeActivityFromPlan
} = plansSlice.actions;

export default plansSlice.reducer;
