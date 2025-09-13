import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const getNearestWeekend = (date: Date) => {
  const day = date.getDay();
  if (day === 0 || day === 6) {
    return date;
  }
  const daysUntilSaturday = (6 - day + 7) % 7;
  const nearestSaturday = new Date(date);
  nearestSaturday.setDate(date.getDate() + daysUntilSaturday);
  return nearestSaturday;
};

type Mood = "Chill" | "Adventurous" | "Productive" | "Cozy";

type ComponentState = {
  selectedDate: string;
  mood: Mood;
};

const initialState: ComponentState = {
  selectedDate: getNearestWeekend(new Date()).toISOString().split("T")[0],
  mood: "Chill",
};

export const componentSlice = createSlice({
  name: "component",
  initialState,
  reducers: {
    setSelectedDate: (state, action: PayloadAction<string>) => {
      state.selectedDate = action.payload;
    },
    setMood: (state, action: PayloadAction<Mood>) => {
      state.mood = action.payload;
    },
  },
});

export const { setSelectedDate, setMood } = componentSlice.actions;
