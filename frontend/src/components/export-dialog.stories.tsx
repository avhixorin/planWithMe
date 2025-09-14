import { Button } from "./ui/button";
import type { ScheduledActivity } from "../../types/planTypes";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ExportDialog } from "./export-dialogue";

const sampleActivities: ScheduledActivity[] = [
  {
    id: "1",
    name: "Morning Jog",
    day: "saturday",
    timeSlot: "morning",
    duration: 30,
    category: "wellness",
    description: "Jogging in the park",
    mood: "Happy",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    icon: "🏃‍♂️",
    image: "https://example.com/jog.jpg",
  },
  {
    id: "2",
    name: "Brunch with Friends",
    day: "saturday",
    timeSlot: "afternoon",
    duration: 90,
    category: "social",
    description: "Brunch at the cafe",
    mood: "Happy",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    icon: "🥞",
    image: "https://example.com/brunch.jpg",
  },
  {
    id: "3",
    name: "Movie Night",
    day: "saturday",
    timeSlot: "evening",
    duration: 120,
    category: "entertainment",
    description: "Watching a movie",
    mood: "Relaxed",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    icon: "🎬",
    image: "https://example.com/movie.jpg",
  },
  {
    id: "4",
    name: "Yoga",
    day: "sunday",
    timeSlot: "morning",
    duration: 45,
    category: "wellness",
    description: "Morning yoga session",
    mood: "Relaxed",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    icon: "🧘‍♀️",
    image: "https://example.com/yoga.jpg",
  },
  {
    id: "5",
    name: "Family Lunch",
    day: "sunday",
    timeSlot: "afternoon",
    duration: 60,
    category: "social",
    description: "Lunch with family",
    mood: "Happy",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    icon: "🍽️",
    image: "https://example.com/lunch.jpg",
  },
];

const meta: Meta<typeof ExportDialog> = {
  title: "Components/ExportDialog",
  component: ExportDialog,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="flex justify-center items-center h-[600px] bg-gray-50 dark:bg-slate-900 p-6">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ExportDialog>;

export const Default: Story = {
  args: {
    activities: sampleActivities,
    children: <Button>Open Export Dialog</Button>,
  },
};

export const EmptyActivities: Story = {
  args: {
    activities: [],
    children: <Button>Open Export Dialog (Empty)</Button>,
  },
};
