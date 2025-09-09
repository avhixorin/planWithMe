import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type ActivityIdea = {
  title: string;
  category: string;
};

type ActivityIdeasState = {
  ideas: ActivityIdea[];
};

const initialState: ActivityIdeasState = {
  ideas: [
    { title: "Morning Coffee", category: "Food" },
    { title: "Go for a Hike", category: "Outdoors" },
    { title: "Watch a Movie", category: "Entertainment" },
    { title: "Brunch with Friends", category: "Food" },
    { title: "Read a Book", category: "Default" },
  ],
};

export const activityIdeasSlice = createSlice({
  name: "activityIdeas",
  initialState,
  reducers: {
    /**
     * Adds a new activity idea to the list.
     * It prevents adding an idea if one with the same title already exists.
     */
    addIdea: (state, action: PayloadAction<ActivityIdea>) => {
      const newIdea = action.payload;
      const ideaExists = state.ideas.some(
        (idea) => idea.title.toLowerCase() === newIdea.title.toLowerCase()
      );

      if (!ideaExists) {
        state.ideas.push(newIdea);
      }
    },
    /**
     * Removes an activity idea from the list using its title.
     */
    removeIdea: (state, action: PayloadAction<{ title: string }>) => {
      const { title } = action.payload;
      state.ideas = state.ideas.filter(
        (idea) => idea.title.toLowerCase() !== title.toLowerCase()
      );
    },
  },
});

export const { addIdea, removeIdea } = activityIdeasSlice.actions;

export default activityIdeasSlice.reducer;