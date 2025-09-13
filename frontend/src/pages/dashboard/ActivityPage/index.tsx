import { ActivityBrowser } from "../../../components/activity-browser";

const ActivityPage = () => {
  return (
    <div className="p-6">
      <h2
        className="text-xl font-semibold text-foreground"
      >
        Browse Activities
      </h2>
      <ActivityBrowser />
    </div>
  );
};

export default ActivityPage;
