import { Activity } from "./planTypes";

type DateRange = {
  start: string;
  end: string;
};

type GROUP_PLAN = {
  id: string;
  title: string;
  dateRange: DateRange;
  activities: Activity[];
  members: string[];
};

export type { GROUP_PLAN, DateRange };
