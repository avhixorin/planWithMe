import { useDispatch } from "react-redux";
import type React from "react";
import { Plus, Coffee, Tent, Film, PartyPopper, Sparkles } from "lucide-react";
import { addActivity } from "../redux/slices/planSlice";

const sampleActivities = [
  { title: "Morning Coffee", category: "Food" },
  { title: "Go for a Hike", category: "Outdoors" },
  { title: "Watch a Movie", category: "Entertainment" },
  { title: "Brunch with Friends", category: "Food" },
  { title: "Read a Book", category: "Default" },
];

type IconCategory = "Food" | "Outdoors" | "Entertainment" | "Default";

const ActivityListItem = ({
  title,
  category,
}: {
  title: string;
  category: IconCategory;
}) => {
  const dispatch = useDispatch();
  const icons: Record<IconCategory, React.ReactElement> = {
    Food: <Coffee className="size-5 text-amber-500" />,
    Outdoors: <Tent className="size-5 text-lime-500" />,
    Entertainment: <Film className="size-5 text-fuchsia-500" />,
    Default: <PartyPopper className="size-5 text-teal-500" />,
  };
  const icon = icons[category] || icons.Default;

  const handleAdd = (day: "saturday" | "sunday") => {
    const iconMap: Record<IconCategory, "FaMugHot" | "FaTree" | "FaFilm" | "FaBookOpen"> = {
      Food: "FaMugHot",
      Outdoors: "FaTree",
      Entertainment: "FaFilm",
      Default: "FaBookOpen",
    };
    dispatch(
      addActivity({
        day,
        activity: { title, category, icon: iconMap[category] },
      })
    );
  };

  return (
    <li className="flex items-center p-3 transition-colors bg-white rounded-lg dark:bg-slate-800 group">
      <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded-full">{icon}</div>
      <div className="flex-1 ml-4">
        <h4 className="font-semibold text-slate-800 dark:text-slate-100">{title}</h4>
        <p className="text-sm text-slate-500 dark:text-slate-400">{category}</p>
      </div>
      <div className="flex gap-2 opacity-0 group-hover:opacity-100">
        <button onClick={() => handleAdd('saturday')} title="Add to Saturday" className="p-2 text-white transition rounded-full bg-sky-500 hover:bg-sky-600">
          <Plus className="size-4" />
        </button>
        <button onClick={() => handleAdd('sunday')} title="Add to Sunday" className="p-2 text-white transition rounded-full bg-sky-500 hover:bg-sky-600">
          <Plus className="size-4" />
        </button>
      </div>
    </li>
  );
};

export const AvailableActivities = () => (
  <div className="sticky top-8 flex flex-col p-6 space-y-4 bg-white rounded-xl shadow-sm dark:bg-slate-800 h-fit">
    <h2 className="flex items-center gap-2 text-xl font-bold text-slate-800 dark:text-white">
      <Sparkles className="text-fuchsia-500" />
      Activity Ideas
    </h2>
    <ul className="space-y-3">
      {sampleActivities.map((activity) => (
        <ActivityListItem
          key={activity.title}
          title={activity.title}
          category={activity.category as IconCategory}
        />
      ))}
    </ul>
  </div>
);