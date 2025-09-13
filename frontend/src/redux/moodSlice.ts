import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import MOODS, {
  moodThemeMap,
  type MOODS as MOODSType,
} from "../../types/moodTypes";

export interface MoodState {
  mood: MOODSType;
}

const initialState: MoodState = {
  mood: MOODS.HAPPY,
};

const moodSlice = createSlice({
  name: "mood",
  initialState,
  reducers: {
    setMood: (state, action: PayloadAction<MOODSType>) => {
      const htmlElement = document.querySelector("html");
      const theme = moodThemeMap[action.payload];
      if (theme && htmlElement) {
        htmlElement.setAttribute("data-theme", theme);
      }
      state.mood = action.payload;
    },
  },
});

export const { setMood } = moodSlice.actions;
export default moodSlice.reducer;
