import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

type Activity = {
  id: string;
  title: string;
  category: string;
  icon: "FaMugHot" | "FaTree" | "FaFilm" | "FaBookOpen";
  mood?: string;
  start?: string;
  durationMinutes?: number;
  description?: string;
  tags?: string[];
};

type ScheduleState = {
  saturday: Activity[];
  sunday: Activity[];
  theme: "default" | "lazy" | "adventurous" | "family";
  lastUpdated: string;
};

const initialState: ScheduleState = {
  saturday: [],
  sunday: [],
  theme: "default",
  lastUpdated: "",
};

const planSlice = createSlice({
  name: "plan",
  initialState,
  reducers: {
    addActivity: (
      state,
      action: PayloadAction<{ day: "saturday" | "sunday"; activity: Omit<Activity, "id"> }>
    ) => {
      const newActivity = { id: uuid(), ...action.payload.activity };
      state[action.payload.day].push(newActivity);
      state.lastUpdated = new Date().toISOString();
    },
    removeActivity: (
      state,
      action: PayloadAction<{ day: "saturday" | "sunday"; id: string }>
    ) => {
      state[action.payload.day] = state[action.payload.day].filter(
        (act) => act.id !== action.payload.id
      );
      state.lastUpdated = new Date().toISOString();
    },
    updateActivity: (
      state,
      action: PayloadAction<{ day: "saturday" | "sunday"; id: string; updates: Partial<Activity> }>
    ) => {
      const idx = state[action.payload.day].findIndex((a) => a.id === action.payload.id);
      if (idx >= 0) {
        state[action.payload.day][idx] = {
          ...state[action.payload.day][idx],
          ...action.payload.updates,
        };
      }
      state.lastUpdated = new Date().toISOString();
    },
    reorderActivity: (
      state,
      action: PayloadAction<{ day: "saturday" | "sunday"; from: number; to: number }>
    ) => {
      const arr = state[action.payload.day];
      const [moved] = arr.splice(action.payload.from, 1);
      arr.splice(action.payload.to, 0, moved);
      state.lastUpdated = new Date().toISOString();
    },
    setTheme: (state, action: PayloadAction<ScheduleState["theme"]>) => {
      state.theme = action.payload;
    },
  },
});

export const { addActivity, removeActivity, updateActivity, reorderActivity, setTheme } =
  planSlice.actions;
export default planSlice.reducer;
