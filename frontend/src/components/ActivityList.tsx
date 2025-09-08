import { useDispatch } from "react-redux";
import { addActivity } from "../redux/slices/planSlice";
import {
  FaMugHot,
  FaTree,
  FaFilm,
  FaBookOpen,
  FaPlus,
  FaLightbulb,
} from "react-icons/fa";

type IconName = "FaMugHot" | "FaTree" | "FaFilm" | "FaBookOpen";

const sampleActivities: { title: string; category: string; icon: IconName; tagColor: string }[] = [
  {
    title: "Brunch",
    category: "Food",
    icon: "FaMugHot",
    tagColor: "bg-amber-100 text-amber-800",
  },
  {
    title: "Hiking",
    category: "Outdoors",
    icon: "FaTree",
    tagColor: "bg-emerald-100 text-emerald-800",
  },
  {
    title: "Movie Night",
    category: "Entertainment",
    icon: "FaFilm",
    tagColor: "bg-indigo-100 text-indigo-800",
  },
  {
    title: "Reading",
    category: "Chill",
    icon: "FaBookOpen",
    tagColor: "bg-sky-100 text-sky-800",
  },
];

export default function ActivityList() {
  const dispatch = useDispatch();

  return (
    <div className="p-5 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-white/30">
      <h2 className="flex items-center gap-2 text-xl font-bold mb-4 text-gray-700">
        <FaLightbulb className="text-yellow-400" />
        Activity Ideas
      </h2>
      <ul className="space-y-3">
        {sampleActivities.map((act) => (
          <li
            key={act.title}
            className="group flex items-center bg-gray-50 p-3 rounded-xl shadow-sm transition-all hover:shadow-md hover:scale-[1.02]"
          >
            <div className="flex items-center gap-3 flex-grow">
              <span className="text-2xl">
                <GetIcon name={act.icon as keyof typeof iconComponents} />
              </span>
              <div>
                <span className="font-semibold text-gray-800">{act.title}</span>
                <span
                  className={`ml-2 px-2 py-0.5 text-xs font-medium rounded-full ${act.tagColor}`}
                >
                  {act.category}
                </span>
              </div>
            </div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                title="Add to Saturday"
                className="p-2 bg-blue-500 text-white rounded-full transition-all hover:bg-blue-600 hover:scale-110 active:scale-95"
                onClick={() =>
                  dispatch(addActivity({ day: "saturday", activity: act }))
                }
              >
                <FaPlus />
              </button>
              <button
                title="Add to Sunday"
                className="p-2 bg-green-500 text-white rounded-full transition-all hover:bg-green-600 hover:scale-110 active:scale-95"
                onClick={() =>
                  dispatch(addActivity({ day: "sunday", activity: act }))
                }
              >
                <FaPlus />
              </button>
            </div>
          </li>
        ))}
      </ul>
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
