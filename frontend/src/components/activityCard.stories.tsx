import type { Activity } from "../../types/planTypes";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import MOODS from "../../types/moodTypes";
import type { Meta, StoryObj } from "@storybook/react-vite";
import ActivityCard from "./activity-card";

const sampleActivity: Activity = {
  id: "1",
  name: "Picnic at the Park",
  description: "Relax with friends and enjoy some sunshine.",
  category: "outdoor",
  mood: MOODS.HAPPY,
  duration: 120,
  icon: "FaTree",
  image:
    "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&h=400&fit=crop",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
};

const meta: Meta<typeof ActivityCard> = {
  title: "Components/ActivityCard",
  component: ActivityCard,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <div className="max-w-md mx-auto">
          <Story />
        </div>
      </Provider>
    ),
  ],
  args: {
    activity: sampleActivity,
  },
};

export default meta;
type Story = StoryObj<typeof ActivityCard>;

export const Default: Story = {};

export const WithLongDescription: Story = {
  args: {
    activity: {
      ...sampleActivity,
      id: "2",
      name: "Mountain Hike Adventure",
      description:
        "A challenging but rewarding hike through the scenic mountain trails. Expect breathtaking views, a chance to reconnect with nature, and a great workout. Don’t forget to bring water and good shoes!",
      category: "outdoor",
      mood: MOODS.EXCITED,
      duration: 240,
    },
  },
};

export const WithoutImage: Story = {
  args: {
    activity: {
      ...sampleActivity,
      id: "3",
      image: undefined,
      name: "Board Game Night",
      description: "Stay cozy indoors with friends and lots of laughter.",
      category: "wellness",
      mood: MOODS.RELAXED,
      duration: 180,
    },
  },
};
