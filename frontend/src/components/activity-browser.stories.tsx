import type { Meta, StoryObj } from "@storybook/react-vite";
import { ACTIVITY_DATA } from "../constants/activity";
import { ActivityBrowser } from "./activity-browser";
import { withRedux } from "../stories/with-redux";

const meta: Meta<typeof ActivityBrowser> = {
  title: "Components/ActivityBrowser",
  component: ActivityBrowser,
  tags: ["autodocs"],
  decorators: [
    withRedux,
    (Story) => (
      <div className="h-[600px] max-w-6xl mx-auto bg-gray-50 dark:bg-slate-900 p-6 rounded-lg shadow-inner">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ActivityBrowser>;
export const Default: Story = {};
export const EmptyData: Story = {
  render: () => {
    (ACTIVITY_DATA).length = 0;
    return <ActivityBrowser />;
  },
};
