import { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addActivityToPlan, addPlan } from "../redux/plansSlice";
import { Card, CardContent } from "./ui/card";
import { Plus, Sparkles, CheckCircle2, CalendarDays } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import type { Activity, Plan, ScheduledActivity } from "../../types/planTypes";
import { CATEGORY_ICONS, CATEGORY_THEMES } from "../constants/activity";
import type { RootState } from "../redux/store";
import { toast } from "sonner";
import { formatWeekend, getNextSixWeekends } from "../../utils/general";

interface ActivityCardProps {
  activity: Activity;
}

const ActivityCard = ({ activity }: ActivityCardProps) => {
  const dispatch = useDispatch();
  const plans = useSelector((state: RootState) => state.weekendPlans.plans);
  const weekends = useMemo(() => getNextSixWeekends(), []);

  const [recentlyAdded, setRecentlyAdded] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [selectedWeekend, setSelectedWeekend] = useState("");
  const [selectedDay, setSelectedDay] = useState<"saturday" | "sunday" | "">(
    ""
  );
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<
    "morning" | "afternoon" | "evening" | ""
  >("");

  const IconComponent = CATEGORY_ICONS[activity.category] || Sparkles;
  const theme = CATEGORY_THEMES[activity.category] || CATEGORY_THEMES.default;

  const handleConfirm = () => {
    if (!selectedWeekend || !selectedDay || !selectedTimeSlot) return;

    const selectedWeekendObject = weekends.find(
      (w) => w.startDate === selectedWeekend
    );

    if (!selectedWeekendObject) {
      toast.error("An error occurred. Please select the weekend again.");
      return;
    }

    const scheduledActivity: ScheduledActivity = {
      ...activity,
      day: selectedDay,
      timeSlot: selectedTimeSlot,
    };

    const planId = formatWeekend(
      selectedWeekendObject.startDate,
      selectedWeekendObject.endDate
    );
    const existingPlan = plans.find((plan: Plan) => plan.id === planId);

    if (existingPlan) {
      dispatch(
        addActivityToPlan({ id: existingPlan.id, activity: scheduledActivity })
      );
    } else {
      const newPlan: Plan = {
        id: planId,
        start: new Date(selectedWeekendObject.startDate).toISOString(),
        end: new Date(selectedWeekendObject.endDate).toISOString(),
        activities: [scheduledActivity],
        updatedAt: new Date().toISOString(),
      };
      dispatch(addPlan(newPlan));
    }

    setRecentlyAdded(true);
    setIsDialogOpen(false);
    setSelectedWeekend("");
    setSelectedDay("");
    setSelectedTimeSlot("");
    toast.success(`"${activity.name}" added to your plan!`);

    setTimeout(() => {
      setRecentlyAdded(false);
    }, 2000);
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  return (
    <>
      <Card
        className={`group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-b-4 ${theme.border}`}
        draggable
      >
        {activity.image && (
          <div className="relative">
            <img
              src={activity.image}
              alt={activity.name}
              className="h-40 w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        )}

        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className={`flex-shrink-0 p-2 mt-1 rounded-lg ${theme.bg}`}>
              <IconComponent className={`h-6 w-6 ${theme.icon}`} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-lg text-gray-800 dark:text-gray-100 truncate">
                {activity.name}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                {activity.description}
              </p>
              <div className="flex items-center gap-2 mt-3 flex-wrap">
                <Badge
                  variant="secondary"
                  className={`capitalize border-transparent ${theme.bg} ${theme.text}`}
                >
                  {activity.category}
                </Badge>
                <Badge
                  variant="outline"
                  className="capitalize dark:text-gray-300 dark:border-gray-600"
                >
                  {activity.mood}
                </Badge>
                {activity.duration && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {activity.duration} min
                  </span>
                )}
              </div>
            </div>
          </div>
        </CardContent>

        <div
          className={`absolute inset-0 flex items-center justify-center bg-black/70 transition-opacity duration-300 
            ${
              recentlyAdded
                ? "opacity-100"
                : "opacity-0 group-hover:opacity-100"
            }`}
        >
          {recentlyAdded ? (
            <div className="flex flex-col items-center text-white animate-fade-in">
              <CheckCircle2 className="h-16 w-16 text-green-400" />
              <p className="mt-2 font-semibold">Added to Plan!</p>
            </div>
          ) : (
            <Button size="lg" onClick={handleOpenDialog}>
              <Plus className="h-5 w-5 mr-2" />
              Add to Plan
            </Button>
          )}
        </div>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent
          className="
      sm:max-w-[480px] 
      bg-white/90 dark:bg-neutral-900/90 
      backdrop-blur-md 
      border border-gray-200 dark:border-neutral-700 
      shadow-xl dark:shadow-lg
    "
        >
          <DialogHeader>
            <div className="flex items-center gap-3 mb-4">
              <div className={`flex-shrink-0 p-2 rounded-lg ${theme.bg}`}>
                <IconComponent className={`h-6 w-6 ${theme.icon}`} />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-neutral-400">
                  Scheduling Activity
                </p>
                <DialogTitle className="text-2xl font-semibold text-gray-900 dark:text-neutral-50">
                  {activity.name}
                </DialogTitle>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <label className="font-medium text-gray-800 dark:text-neutral-300">
                Choose a Weekend
              </label>
              <Select
                onValueChange={setSelectedWeekend}
                value={selectedWeekend}
              >
                <SelectTrigger className="dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200 mt-1">
                  <CalendarDays className="h-4 w-4 mr-2 opacity-70" />
                  <SelectValue placeholder="Select from upcoming weekends..." />
                </SelectTrigger>
                <SelectContent className="dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200">
                  {weekends.map((weekend) => (
                    <SelectItem
                      key={weekend.startDate}
                      value={weekend.startDate}
                      className="dark:focus:bg-neutral-700"
                    >
                      {formatWeekend(weekend.startDate, weekend.endDate)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="font-medium text-gray-800 dark:text-neutral-300">
                Pick a Day
              </label>
              <div className="grid grid-cols-2 gap-2 mt-1">
                <Button
                  variant={selectedDay === "saturday" ? "default" : "outline"}
                  onClick={() => setSelectedDay("saturday")}
                >
                  Saturday
                </Button>
                <Button
                  variant={selectedDay === "sunday" ? "default" : "outline"}
                  onClick={() => setSelectedDay("sunday")}
                >
                  Sunday
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-medium text-gray-800 dark:text-neutral-300">
                Select a Time Slot
              </label>
              <div className="grid grid-cols-3 gap-2 mt-1">
                <Button
                  variant={
                    selectedTimeSlot === "morning" ? "default" : "outline"
                  }
                  onClick={() => setSelectedTimeSlot("morning")}
                >
                  Morning
                </Button>
                <Button
                  variant={
                    selectedTimeSlot === "afternoon" ? "default" : "outline"
                  }
                  onClick={() => setSelectedTimeSlot("afternoon")}
                >
                  Afternoon
                </Button>
                <Button
                  variant={
                    selectedTimeSlot === "evening" ? "default" : "outline"
                  }
                  onClick={() => setSelectedTimeSlot("evening")}
                >
                  Evening
                </Button>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="ghost"
              className="text-gray-600 dark:text-neutral-300"
              onClick={() => setIsDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={!selectedWeekend || !selectedDay || !selectedTimeSlot}
            >
              Confirm & Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ActivityCard;
