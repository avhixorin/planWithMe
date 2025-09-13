export interface Activity {
  id: string;
  name: string;
  category:
    | "food"
    | "outdoor"
    | "entertainment"
    | "wellness"
    | "social"
    | "creative";
  description: string;
  duration?: number;
  mood: "relaxed" | "energetic" | "social" | "adventurous";
  createdAt: string;
  updatedAt: string;
  icon: string;
  image?: string;
}
export interface ScheduledActivity extends Activity {
  day: "saturday" | "sunday";
  timeSlot: "morning" | "afternoon" | "evening";
}

export type Plan = {
  id: string;
  start: string;
  end: string;
  activities: Activity[];
  updatedAt: string;
};
