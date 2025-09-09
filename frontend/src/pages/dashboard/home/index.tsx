import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../../redux/store";
import {
  ActivityCard,
  EmptyDayCard,
} from "../../../components/dashboard-cards";
import { AvailableActivities } from "../../../components/available-activities";
import {
  updateActivity,
  removeActivity,
} from "../../../redux/slices/planSlice";
import type { Activity } from "../../../../types/planTypes";
import { getWeekendDates } from "../../../../utils/general";
const DashboardHome = () => {
  const dispatch = useDispatch();
  const plans = useSelector((state: RootState) => state.plan.plans);
  const selectedDate = useSelector(
    (state: RootState) => state.componentSlice.selectedDate
  );

  const saturdayPlan = plans.find((plan) => plan.day === "saturday");
  const sundayPlan = plans.find((plan) => plan.day === "sunday");

  const weekend = getWeekendDates(selectedDate);

  const handleUpdateActivity = (
    day: "saturday" | "sunday",
    updates: Partial<Activity>
  ) => {
    if (!updates.id) return;
    dispatch(updateActivity({ day, activityId: updates.id, updates }));
  };

  const handleDeleteActivity = (
    day: "saturday" | "sunday",
    activityId: string
  ) => {
    dispatch(removeActivity({ day, activityId }));
  };

  return (
    <div className="grid w-full h-full grid-cols-1 gap-8 lg:grid-cols-[1fr_350px] p-6 sm:p-8 bg-slate-50 dark:bg-slate-900">
      <main className="flex flex-col min-h-0">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Your Weekend Itinerary
            </h1>
            <p className="mt-1 text-slate-600 dark:text-slate-400">
              Upcoming plan for{" "}
              <span className="font-semibold text-teal-500">
                {weekend.saturday} &mdash; {weekend.sunday}
              </span>
            </p>
          </div>
        </header>

        <div className="grid flex-1 grid-cols-1 gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-sky-500">Saturday</h2>
            {saturdayPlan && saturdayPlan.activities.length > 0 ? (
              saturdayPlan.activities.map((activity) => (
                <ActivityCard
                  key={activity.id}
                  activity={activity}
                  onUpdate={(updates) =>
                    handleUpdateActivity("saturday", updates)
                  }
                  onDelete={(id) => handleDeleteActivity("saturday", id)}
                />
              ))
            ) : (
              <EmptyDayCard day="Saturday" />
            )}
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold text-sky-500">Sunday</h2>
            {sundayPlan && sundayPlan.activities.length > 0 ? (
              sundayPlan.activities.map((activity) => (
                <ActivityCard
                  key={activity.id}
                  activity={activity}
                  onUpdate={(updates) =>
                    handleUpdateActivity("sunday", updates)
                  }
                  onDelete={(id) => handleDeleteActivity("sunday", id)}
                />
              ))
            ) : (
              <EmptyDayCard day="Sunday" />
            )}
          </div>
        </div>
      </main>

      <aside>
        <AvailableActivities />
      </aside>
    </div>
  );
};

export default DashboardHome;
