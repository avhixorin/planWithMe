import { WeekendSchedule } from "../../components/weekend-schedule";
import { useEffect, useMemo, useState } from "react";
import type { Activity, ScheduledActivity } from "../../../types/planTypes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { formatWeekend, getNextSixWeekends } from "../../../utils/general";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { EmptyDayCard } from "../../components/empty-day-card";

const Plans = () => {
  const weekends = useMemo(() => getNextSixWeekends(), []);
  const [selectedWeekend, setSelectedWeekend] = useState<string>(
    weekends[0]?.startDate || ""
  );
  const [selectedActivities, setSelectedActivities] = useState<
    ScheduledActivity[]
  >([]);

  const allPlans = useSelector((state: RootState) => state.weekendPlans.plans);

  const selectedPlan = useMemo(() => {
    if (!selectedWeekend) return undefined;
    return allPlans.find(
      (plan) =>
        new Date(plan.start).toDateString() ===
        new Date(selectedWeekend).toDateString()
    );
  }, [allPlans, selectedWeekend]);

  console.log("The selected plan is", selectedPlan);

  useEffect(() => {
    if (selectedPlan) {
      const activities = selectedPlan.activities.map((a, index) => ({
        ...a,
        day: (index % 2 === 0 ? "saturday" : "sunday") as "saturday" | "sunday",
        timeSlot: "morning" as "morning" | "afternoon" | "evening",
      }));
      setSelectedActivities(activities);
    } else {
      setSelectedActivities([]);
    }
  }, [selectedPlan]);

  const handleActivityAdd = (
    activity: Activity,
    day: "saturday" | "sunday",
    timeSlot: "morning" | "afternoon" | "evening"
  ) => {
    const scheduledActivity: ScheduledActivity = {
      ...activity,
      id: `${activity.id}-${Date.now()}`,
      day,
      timeSlot,
      duration: activity.duration || 60,
    };
    setSelectedActivities((prev) => [...prev, scheduledActivity]);
  };

  const handleActivityRemove = (activityId: string) => {
    setSelectedActivities((prev) =>
      prev.filter((activity) => activity.id !== activityId)
    );
  };

  const handleActivityUpdate = (updatedActivity: ScheduledActivity) => {
    setSelectedActivities((prev) =>
      prev.map((activity) =>
        activity.id === updatedActivity.id ? updatedActivity : activity
      )
    );
  };
  const saturdayActivities = useMemo(
    () => selectedActivities.filter((act) => act.day === "saturday"),
    [selectedActivities]
  );
  const sundayActivities = useMemo(
    () => selectedActivities.filter((act) => act.day === "sunday"),
    [selectedActivities]
  );

  return (
    <div className="w-full p-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 w-full">
        <h2 className="text-xl font-semibold">Your Weekend Plan</h2>
        <Select onValueChange={setSelectedWeekend} value={selectedWeekend}>
          <SelectTrigger>
            <SelectValue placeholder="Choose a weekend..." />
          </SelectTrigger>
          <SelectContent>
            {weekends.map((weekend) => (
              <SelectItem
                key={weekend.startDate}
                value={weekend.startDate}
                className="dark:focus:bg-slate-700"
              >
                {formatWeekend(weekend.startDate, weekend.endDate)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <main key={selectedWeekend} className="animate-fade-in-slow mt-4">
        {selectedActivities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <WeekendSchedule
              day="saturday"
              activities={saturdayActivities}
              onActivityRemove={handleActivityRemove}
              onActivityUpdate={handleActivityUpdate}
              onActivityAdd={handleActivityAdd}
            />
            <WeekendSchedule
              day="sunday"
              activities={sundayActivities}
              onActivityRemove={handleActivityRemove}
              onActivityUpdate={handleActivityUpdate}
              onActivityAdd={handleActivityAdd}
            />
          </div>
        ) : (
          <EmptyDayCard />
        )}
      </main>
    </div>
  );
};

export default Plans;
