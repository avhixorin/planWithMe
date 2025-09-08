import type React from "react";
import { Plus, Coffee, Tent, Film, PartyPopper } from "lucide-react";

type IconCategory = "Food" | "Outdoors" | "Entertainment" | "Default";

export const ActivityCard = ({ title, category }: { title: string; category: string; }) => {
  const icons: Record<IconCategory, React.ReactElement> = {
    Food: <Coffee className="size-5 text-amber-500" />,
    Outdoors: <Tent className="size-5 text-lime-500" />,
    Entertainment: <Film className="size-5 text-fuchsia-500" />,
    Default: <PartyPopper className="size-5 text-teal-500" />,
  };
  const icon = icons[category as IconCategory] || icons.Default;
  
  const iconBgColors: Record<IconCategory, string> = {
    Food: "bg-amber-100 dark:bg-amber-900/50",
    Outdoors: "bg-lime-100 dark:bg-lime-900/50",
    Entertainment: "bg-fuchsia-100 dark:bg-fuchsia-900/50",
    Default: "bg-teal-100 dark:bg-teal-900/50",
  };
  const iconBg = iconBgColors[category as IconCategory] || iconBgColors.Default;

  return (
    <div className="flex items-start p-4 space-x-4 bg-white border border-transparent rounded-lg shadow-sm dark:bg-slate-800 hover:border-teal-500 transition-colors">
      <div className={`p-3 rounded-full ${iconBg}`}>{icon}</div>
      <div>
        <h4 className="font-semibold text-slate-800 dark:text-slate-100">{title}</h4>
        <p className="text-sm text-slate-500 dark:text-slate-400">{category}</p>
      </div>
    </div>
  );
};

export const EmptyDayCard = ({ day }: { day: string }) => (
  <div className="flex flex-col items-center justify-center p-6 text-center border-2 border-dashed rounded-xl bg-slate-100/30 border-slate-300 dark:bg-slate-800/30 dark:border-slate-700">
    <h3 className="font-semibold text-slate-700 dark:text-slate-200">Your {day} is free!</h3>
    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Add an activity to get started.</p>
    <button className="flex items-center gap-2 px-4 py-2 mt-4 text-sm font-semibold text-white transition-transform transform bg-teal-500 rounded-full hover:bg-teal-600 hover:scale-105">
      <Plus className="size-4" />
      Add to {day}
    </button>
  </div>
);