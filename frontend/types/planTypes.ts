export type Activity = {
  id: string;
  title: string;
  description: string;
  icon: string;
  colour: string;
  updatedAt: string;
  createdAt: string;
};

export type Plan = {
  id: string;
  day: "saturday" | "sunday";
  activities: Activity[];
  date: string;
  updatedAt: string;
};
