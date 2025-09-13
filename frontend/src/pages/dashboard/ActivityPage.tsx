import { ActivityBrowser } from "../../components/activity-browser";

const ActivityPage = () => {

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">Browse Activities</h2>
      <ActivityBrowser />
    </div>
  );
};

export default ActivityPage;
