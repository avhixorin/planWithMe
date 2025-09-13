import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatWeekend, getNextSixWeekends } from "../../../../utils/general";
import type { Activity, ScheduledActivity } from "../../../../types/planTypes";
import type { RootState } from "../../../redux/store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { WeekendSchedule } from "../../../components/weekend-schedule";
import { EmptyDayCard } from "../../../components/empty-day-card";
import { Button } from "../../../components/ui/button";
import { ExportDialog } from "../../../components/export-dialogue";
import { Share2 } from "lucide-react";
import { removeActivityFromPlan } from "../../../redux/plansSlice";
import { toast } from "sonner";
import { ConfirmDialog } from "../../../components/confirm-dialog";

const Plans = () => {
  const weekends = useMemo(() => getNextSixWeekends(), []);
  const [selectedWeekend, setSelectedWeekend] = useState<string>(
    weekends[0]?.startDate || ""
  );
  const [selectedActivities, setSelectedActivities] = useState<
    ScheduledActivity[]
  >([]);
  const [activityToDelete, setActivityToDelete] = useState<string | null>(null);
  const dispatch = useDispatch();
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

  const handleRequestRemove = (activityId: string) => {
    setActivityToDelete(activityId);
  };

  const handleConfirmRemove = () => {
    if (!activityToDelete) return;

    const promise = new Promise<void>((resolve, reject) => {
      if (!selectedPlan) {
        return reject(new Error("No active plan selected."));
      }
      dispatch(
        removeActivityFromPlan({
          planId: selectedPlan.id,
          activityId: activityToDelete,
        })
      );
      resolve();
    });

    toast.promise(promise, {
      loading: "Removing activity...",
      success: "Activity removed from your plan! 🎉",
      error: (err) => err.message || "Failed to remove activity.",
    });
    setActivityToDelete(null);
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
      <ConfirmDialog
        isOpen={!!activityToDelete}
        onClose={() => setActivityToDelete(null)}
        onConfirm={handleConfirmRemove}
        title="Remove Activity"
        description="Are you sure you want to remove this activity from your plan? This action cannot be undone."
      />
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 w-full">
        <h2 className="text-xl font-semibold text-foreground">
          Your Weekend Plan
        </h2>
        <div className="flex items-center gap-2">
          {selectedActivities.length > 0 && (
            <ExportDialog activities={selectedActivities}>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 bg-transparent text-foreground"
              >
                <Share2 className="h-4 w-4" />
                Export
              </Button>
            </ExportDialog>
          )}
          <Select onValueChange={setSelectedWeekend} value={selectedWeekend}>
            <SelectTrigger className="text-foreground cursor-pointer">
              <SelectValue placeholder="Choose a weekend..." />
            </SelectTrigger>
            <SelectContent>
              {weekends.map((weekend) => (
                <SelectItem
                  key={weekend.startDate}
                  value={weekend.startDate}
                  className="dark:focus:bg-zinc-700 cursor-pointer"
                >
                  {formatWeekend(weekend.startDate, weekend.endDate)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <main key={selectedWeekend} className="animate-fade-in-slow mt-4">
        {selectedActivities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <WeekendSchedule
              day="saturday"
              activities={saturdayActivities}
              onActivityRemove={handleRequestRemove}
              onActivityUpdate={handleActivityUpdate}
              onActivityAdd={handleActivityAdd}
            />
            <WeekendSchedule
              day="sunday"
              activities={sundayActivities}
              onActivityRemove={handleRequestRemove}
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
