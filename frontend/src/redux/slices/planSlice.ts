import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import { type Activity, type Plan } from "../../../types/planTypes";

export type PlanState = {
  plans: Plan[];
};

const initialState: PlanState = {
  plans: [],
};

const planSlice = createSlice({
  name: "plan",
  initialState,
  reducers: {
    /**
     * Creates a new, empty plan for a given day if one doesn't already exist.
     */
    addPlan: (
      state,
      action: PayloadAction<{ day: "saturday" | "sunday"; date: string }>
    ) => {
      const { day, date } = action.payload;
      const planExists = state.plans.some((plan) => plan.day === day);

      if (!planExists) {
        const newPlan: Plan = {
          id: uuid(),
          day,
          date,
          activities: [],
          updatedAt: new Date().toISOString(),
        };
        state.plans.push(newPlan);
      }
    },

    /**
     * Adds a new activity to a specific day's plan.
     * If a plan for that day doesn't exist, it creates one.
     */
    addActivity: (
      state,
      action: PayloadAction<{
        day: "saturday" | "sunday";
        activityData: Omit<Activity, "id" | "createdAt" | "updatedAt">;
      }>
    ) => {
      const { day, activityData } = action.payload;
      let plan = state.plans.find((p) => p.day === day);
      const now = new Date().toISOString();

      if (!plan) {
        plan = {
          id: uuid(),
          day: day,
          activities: [],
          date: new Date().toISOString().split("T")[0],
          updatedAt: now,
        };
        state.plans.push(plan);
      }

      const newActivity: Activity = {
        id: uuid(),
        ...activityData,
        createdAt: now,
        updatedAt: now,
      };

      plan.activities.push(newActivity);
      plan.updatedAt = now;
    },

    /**
     * Removes an activity from a specific day's plan using its ID.
     */
    removeActivity: (
      state,
      action: PayloadAction<{ day: "saturday" | "sunday"; activityId: string }>
    ) => {
      const { day, activityId } = action.payload;
      const plan = state.plans.find((p) => p.day === day);

      if (plan) {
        plan.activities = plan.activities.filter(
          (activity) => activity.id !== activityId
        );
        plan.updatedAt = new Date().toISOString();
      }
    },

    /**
     * Updates one or more properties of a specific activity.
     */
    updateActivity: (
      state,
      action: PayloadAction<{
        day: "saturday" | "sunday";
        activityId: string;
        updates: Partial<Omit<Activity, "id">>;
      }>
    ) => {
      const { day, activityId, updates } = action.payload;
      const plan = state.plans.find((p) => p.day === day);

      if (plan) {
        const activityToUpdate = plan.activities.find(
          (activity) => activity.id === activityId
        );

        if (activityToUpdate) {
          Object.assign(activityToUpdate, updates);
          activityToUpdate.updatedAt = new Date().toISOString();
          plan.updatedAt = new Date().toISOString();
        }
      }
    },
    moveActivity: (
      state,
      action: PayloadAction<{
        sourceDay: "saturday" | "sunday";
        destinationDay: "saturday" | "sunday";
        activityId: string;
        targetIndex: number;
      }>
    ) => {
      const { sourceDay, destinationDay, activityId, targetIndex } =
        action.payload;
      const sourcePlan = state.plans.find((p) => p.day === sourceDay);
      const destinationPlan = state.plans.find((p) => p.day === destinationDay);

      if (sourcePlan && destinationPlan) {
        const activityIndex = sourcePlan.activities.findIndex(
          (act) => act.id === activityId
        );

        if (activityIndex > -1) {
          const [movedActivity] = sourcePlan.activities.splice(
            activityIndex,
            1
          );
          destinationPlan.activities.splice(targetIndex, 0, movedActivity);
        }
      }
    },
  },
});

export const { addPlan, addActivity, removeActivity, updateActivity, moveActivity } =
  planSlice.actions;
export default planSlice.reducer;
