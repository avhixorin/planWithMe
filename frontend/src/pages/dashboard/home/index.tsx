import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";
import { getWeekendDates } from "../../../../utils";
import {
  ActivityCard,
  EmptyDayCard,
} from "../../../components/dashboard-cards";
import { AvailableActivities } from "../../../components/available-activities";

const DashboardHome = () => {
  const plans = useSelector((state: RootState) => state.plan);
  const selectedDate = useSelector(
    (state: RootState) => state.componentSlice.selectedDate
  );
  const weekend = getWeekendDates(selectedDate);

  return (
    <div className="grid w-full h-full grid-cols-1 gap-8 lg:grid-cols-[1fr_350px] p-6 sm:p-8 bg-slate-50 dark:bg-slate-900">
      <main className="flex flex-col">
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
            {plans.saturday.length > 0 ? (
              plans.saturday.map((activity) => (
                <ActivityCard key={activity.id} {...activity} />
              ))
            ) : (
              <EmptyDayCard day="Saturday" />
            )}
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold text-sky-500">Sunday</h2>
            {plans.sunday.length > 0 ? (
              plans.sunday.map((activity) => (
                <ActivityCard key={activity.id} {...activity} />
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
