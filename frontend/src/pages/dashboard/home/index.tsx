import { useSelector } from "react-redux";
import type React from "react";
import type { RootState } from "../../../redux/store";
import { Plus, Coffee, Tent, Film, PartyPopper } from "lucide-react";
import { getWeekendDates } from "../../../../utils";
type IconCategory = "Food" | "Outdoors" | "Entertainment" | "Default";

const ActivityCard = ({
  title,
  category,
}: {
  title: string;
  category: string;
}) => {
  const icons: Record<IconCategory, React.ReactElement> = {
    Food: <Coffee className="size-5 text-amber-500" />,
    Outdoors: <Tent className="size-5 text-emerald-500" />,
    Entertainment: <Film className="size-5 text-indigo-500" />,
    Default: <PartyPopper className="size-5 text-pink-500" />,
  };
  const validCategories: ReadonlyArray<IconCategory> = [
    "Food",
    "Outdoors",
    "Entertainment",
    "Default",
  ];
  const iconCategory: IconCategory = validCategories.includes(
    category as IconCategory
  )
    ? (category as IconCategory)
    : "Default";
  const icon = icons[iconCategory];

  return (
    <div className="flex items-start p-4 space-x-4 bg-white rounded-lg shadow-sm">
      <div className="p-3 bg-gray-100 rounded-full">{icon}</div>
      <div>
        <h4 className="font-semibold text-gray-800">{title}</h4>
        <p className="text-sm text-gray-500">{category}</p>
      </div>
    </div>
  );
};

const EmptyDayCard = ({ day }: { day: string }) => (
  <div className="flex flex-col items-center justify-center p-6 text-center border-2 border-dashed rounded-xl bg-gray-50/50">
    <h3 className="font-semibold text-gray-700">Your {day} is free!</h3>
    <p className="mt-1 text-sm text-gray-500">
      Add an activity to get started.
    </p>
    <button className="flex items-center gap-2 px-4 py-2 mt-4 text-sm font-semibold text-white transition-transform transform bg-purple-500 rounded-full hover:bg-purple-600 hover:scale-105">
      <Plus className="size-4" />
      Add to {day}
    </button>
  </div>
);

const DashboardHome = () => {
  const plans = useSelector((state: RootState) => state.plan);
  const selectedDate = useSelector(
    (state: RootState) => state.componentSlice.selectedDate
  );
  const weekend = getWeekendDates(selectedDate);

  return (
    <div className="w-full h-full p-6 sm:p-4 bg-gray-50">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Your Weekend Itinerary
          </h1>
          <p className="mt-1 text-gray-600">
            Upcoming plan for{" "}
            <span className="font-semibold text-purple-600">
              {weekend.saturday} &mdash; {weekend.sunday}
            </span>
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 font-semibold text-white transition bg-gray-800 rounded-lg hover:bg-gray-900">
          <Plus className="size-4" />
          <span>Add Activity</span>
        </button>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800">Saturday</h2>
          {plans.saturday.length > 0 ? (
            plans.saturday.map((activity) => (
              <ActivityCard key={activity.id} {...activity} />
            ))
          ) : (
            <EmptyDayCard day="Saturday" />
          )}
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800">Sunday</h2>
          {plans.sunday.length > 0 ? (
            plans.sunday.map((activity) => (
              <ActivityCard key={activity.id} {...activity} />
            ))
          ) : (
            <EmptyDayCard day="Sunday" />
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
