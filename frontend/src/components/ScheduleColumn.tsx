import { useDispatch, useSelector } from "react-redux";
import { removeActivity } from "../redux/slices/planSlice";
import type { RootState } from "../redux/store";
import { FaFilm, FaBookOpen, FaRegCalendarPlus, FaTrash, FaTree, FaMugHot } from "react-icons/fa";

const dayStyles = {
  saturday: {
    bg: "bg-blue-50",
    header: "text-blue-600",
    iconColor: "text-blue-300",
  },
  sunday: {
    bg: "bg-green-50",
    header: "text-green-600",
    iconColor: "text-green-300",
  },
};

export default function ScheduleColumn({
  day,
}: {
  day: "saturday" | "sunday";
}) {
  const dispatch = useDispatch();
  const activities = useSelector((state: RootState) => state.plan[day]);
  const styles = dayStyles[day];

  return (
    <div
      className={`p-5 ${styles.bg} rounded-2xl shadow-inner flex-1 flex flex-col`}
    >
      <h2 className={`text-xl font-bold capitalize mb-4 ${styles.header}`}>
        {day}'s Plan
      </h2>
      {activities.length === 0 ? (
        <div
          className={`flex-1 flex flex-col items-center justify-center text-center p-4 border-2 border-dashed ${styles.iconColor} rounded-xl`}
        >
          <FaRegCalendarPlus className="text-4xl mb-2" />
          <p className="font-semibold text-gray-500">Your canvas is empty!</p>
          <p className="text-sm text-gray-400">
            Add an activity to start planning.
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {activities.map((act) => (
            <li
              key={act.id}
              className="group flex justify-between items-center bg-white p-3 rounded-xl shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">
                  <GetIcon name={act.icon as unknown as keyof typeof iconComponents} />
                </span>
                <span className="font-semibold text-gray-800">{act.title}</span>
              </div>
              <button
                className="p-2 text-gray-400 rounded-full transition-all hover:bg-red-100 hover:text-red-500 hover:scale-110 active:scale-95 opacity-50 group-hover:opacity-100"
                onClick={() => dispatch(removeActivity({ day, id: act.id }))}
                title="Remove Activity"
              >
                <FaTrash />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const iconComponents = {
  FaMugHot: <FaMugHot className="text-amber-500" />,
  FaTree: <FaTree className="text-emerald-500" />,
  FaFilm: <FaFilm className="text-indigo-500" />,
  FaBookOpen: <FaBookOpen className="text-sky-500" />,
};

export const GetIcon = ({ name }: { name: keyof typeof iconComponents }) => {
  return iconComponents[name] || null;
};