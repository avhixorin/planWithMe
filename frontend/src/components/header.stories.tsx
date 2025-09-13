import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import Header from "./header";
import type { Meta, StoryObj } from "@storybook/react-vite";

const mockWeekendPlansSlice = createSlice({
  name: "weekendPlans",
  initialState: {
    plans: [
      { id: "plan1", activities: [{ id: "act1" }, { id: "act2" }] },
      { id: "plan2", activities: [{ id: "act3" }] },
    ],
  },
  reducers: {},
});

const mockStore = configureStore({
  reducer: {
    weekendPlans: mockWeekendPlansSlice.reducer,
  },
});

interface HeaderStoryArgs {
  initialRoute?: string;
}

const meta: Meta<typeof Header> = {
  title: "Components/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <Provider store={mockStore}>
        <Story />
      </Provider>
    ),
    (Story, context) => {
      const initialRoute = (context.args as HeaderStoryArgs).initialRoute || "/";
      return (
        <MemoryRouter initialEntries={[initialRoute]}>
          <Routes>
            <Route path="/*" element={<Story />} />
          </Routes>
        </MemoryRouter>
      );
    },
  ],
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const OnHomePage: Story = {
  name: "Default View (Home Page)",
  args: {
    initialRoute: "/",
  },
};

export const OnPlansPage: Story = {
  name: "View on Plans Page",
  args: {
    initialRoute: "/plans", 
  },
};

