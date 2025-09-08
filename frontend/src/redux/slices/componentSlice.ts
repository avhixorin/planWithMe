import { createSlice } from "@reduxjs/toolkit";

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

const initialState = {
  selectedDate: getNearestWeekend(new Date()),
};

export const componentSlice = createSlice({
  name: "component",
  initialState,
  reducers: {
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
  },
});

export const { setSelectedDate } = componentSlice.actions;

