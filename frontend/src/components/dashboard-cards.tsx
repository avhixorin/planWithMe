import { useState } from "react";
import { Plus, Palette, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { Activity } from "../../types/planTypes";

type ActivityCardProps = {
  activity: Activity;
  onUpdate: (updatedActivity: Partial<Activity>) => void;
  onDelete: (id: string) => void;
};

export const ActivityCard = ({
  activity,
  onUpdate,
  onDelete,
}: ActivityCardProps) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDesc, setIsEditingDesc] = useState(false);

  const [currentTitle, setCurrentTitle] = useState(activity.title);
  const [currentDescription, setCurrentDescription] = useState(
    activity.description
  );

  const [rotation] = useState(Math.random() * 4 - 2);

  const handleSave = () => {
    setIsEditingTitle(false);
    setIsEditingDesc(false);
    if (
      currentTitle !== activity.title ||
      currentDescription !== activity.description
    ) {
      onUpdate({
        id: activity.id,
        title: currentTitle,
        description: currentDescription,
        updatedAt: new Date().toISOString(),
      });
    }
  };

  return (
    <div
      className="flex flex-col p-4 rounded-lg shadow-lg font-kalam transition-transform hover:scale-105 cursor-grab"
      style={{
        backgroundColor: activity.colour,
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <div className="flex items-start gap-3 mb-2">
        <span className="text-2xl">{activity.icon}</span>
        {isEditingTitle ? (
          <input
            type="text"
            value={currentTitle}
            onChange={(e) => setCurrentTitle(e.target.value)}
            onBlur={handleSave}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
            className="w-full p-1 text-lg font-bold bg-transparent border-b-2 border-slate-500 focus:outline-none"
            autoFocus
          />
        ) : (
          <h4
            onClick={() => setIsEditingTitle(true)}
            className="w-full text-lg font-bold text-slate-800"
          >
            {activity.title}
          </h4>
        )}
      </div>

      {/* CARD BODY: Editable Description */}
      <div className="flex-grow min-h-[60px]">
        {isEditingDesc ? (
          <textarea
            value={currentDescription}
            onChange={(e) => setCurrentDescription(e.target.value)}
            onBlur={handleSave}
            className="w-full p-1 text-base bg-transparent border-b-2 resize-none border-slate-400 focus:outline-none"
            autoFocus
            rows={3}
          />
        ) : (
          <p
            onClick={() => setIsEditingDesc(true)}
            className="w-full text-base text-slate-700 whitespace-pre-wrap"
          >
            {activity.description || "Click to add a description..."}
          </p>
        )}
      </div>

      {/* CARD FOOTER: Metadata and Actions */}
      <div className="flex items-center justify-between mt-4 text-xs text-slate-500">
        <span>
          {formatDistanceToNow(new Date(activity.updatedAt), {
            addSuffix: true,
          })}
        </span>
        <div className="flex items-center gap-2">
          <button
            className="transition-transform hover:scale-125"
            title="Change color"
          >
            <Palette className="size-4" />
          </button>
          <button
            onClick={() => onDelete(activity.id)}
            className="transition-transform hover:scale-125 text-rose-500"
            title="Delete note"
          >
            <Trash2 className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// The EmptyDayCard remains unchanged as it serves a different purpose
export const EmptyDayCard = ({ day }: { day: string }) => (
  <div className="flex flex-col items-center justify-center p-6 text-center border-2 border-dashed rounded-xl bg-slate-100/30 border-slate-300 dark:bg-slate-800/30 dark:border-slate-700">
    <h3 className="font-semibold text-slate-700 dark:text-slate-200">
      Your {day} is free!
    </h3>
    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
      Add an activity to get started.
    </p>
    <button className="flex items-center gap-2 px-4 py-2 mt-4 text-sm font-semibold text-white transition-transform transform bg-teal-500 rounded-full hover:bg-teal-600 hover:scale-105">
      <Plus className="size-4" />
      Add to {day}
    </button>
  </div>
);
