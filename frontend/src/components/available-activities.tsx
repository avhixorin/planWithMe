import { useDispatch, useSelector } from "react-redux";
import { Plus, Coffee, Tent, Film, PartyPopper, Sparkles } from "lucide-react";
import { addActivity } from "../redux/slices/planSlice";
import type { RootState } from "../redux/store";
const categoryDetails = {
  Food: {
    iconComponent: <Coffee className="size-5 text-amber-500" />,
    emoji: "☕️",
    colourHex: "#FFF9C4",
  },
  Outdoors: {
    iconComponent: <Tent className="size-5 text-lime-500" />,
    emoji: "⛺️",
    colourHex: "#DCE775",
  },
  Entertainment: {
    iconComponent: <Film className="size-5 text-fuchsia-500" />,
    emoji: "🎬",
    colourHex: "#F48FB1",
  },
  Default: {
    iconComponent: <PartyPopper className="size-5 text-teal-500" />,
    emoji: "🎉",
    colourHex: "#B2EBF2",
  },
};

type CategoryKey = keyof typeof categoryDetails;

const ActivityListItem = ({
  title,
  category,
}: {
  title: string;
  category: CategoryKey;
}) => {
  const dispatch = useDispatch();

  const details = categoryDetails[category] || categoryDetails.Default;

  const handleAdd = (day: "saturday" | "sunday") => {
    dispatch(
      addActivity({
        day,
        activityData: {
          title,
          description: "",
          icon: details.emoji, 
          colour: details.colourHex, 
        },
      })
    );
  };

  return (
    <li className="flex items-center p-3 transition-colors bg-white rounded-lg dark:bg-slate-800 group">
      <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded-full">
        {details.iconComponent}
      </div>
      <div className="flex-1 ml-4">
        <h4 className="font-semibold text-slate-800 dark:text-slate-100">
          {title}
        </h4>
        <p className="text-sm text-slate-500 dark:text-slate-400">{category}</p>
      </div>
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => handleAdd("saturday")}
          title="Add to Saturday"
          className="p-2 text-white transition rounded-full bg-sky-500 hover:bg-sky-600"
        >
          <Plus className="size-4" />
        </button>
        <button
          onClick={() => handleAdd("sunday")}
          title="Add to Sunday"
          className="p-2 text-white transition rounded-full bg-sky-500 hover:bg-sky-600"
        >
          <Plus className="size-4" />
        </button>
      </div>
    </li>
  );
};

export const AvailableActivities = () => {
  const activities = useSelector(
    (state: RootState) => state.activityIdeas.ideas
  );

  return (
    <div className="sticky top-8 flex flex-col p-6 space-y-4 bg-white rounded-xl shadow-sm dark:bg-slate-800 h-fit">
      <h2 className="flex items-center gap-2 text-xl font-bold text-slate-800 dark:text-white">
        <Sparkles className="text-fuchsia-500" />
        Activity Ideas
      </h2>
      <ul className="space-y-3">
        {activities.map((activity: { title: string; category: string }) => (
          <ActivityListItem
            key={activity.title}
            title={activity.title}
            category={activity.category as CategoryKey}
          />
        ))}
      </ul>
    </div>
  );
};
