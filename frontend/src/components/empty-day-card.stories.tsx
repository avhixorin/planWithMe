import { MemoryRouter } from "react-router-dom";
import { EmptyDayCard } from "./empty-day-card";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta: Meta<typeof EmptyDayCard> = {
  title: "Components/EmptyDayCard",
  component: EmptyDayCard,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div className="flex justify-center items-center h-[500px] bg-gray-100 dark:bg-slate-900 p-6">
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof EmptyDayCard>;

export const Default: Story = {};
