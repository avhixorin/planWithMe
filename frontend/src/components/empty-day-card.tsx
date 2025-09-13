import { CalendarPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

export const EmptyDayCard = () => {
  const navigate = useNavigate();
  return (
    <Card className="col-span-1 md:col-span-2 flex flex-col items-center justify-center p-12 mt-4 border-2 border-dashed bg-gray-50/50 dark:bg-slate-800/20 dark:border-slate-700 max-w-xl mx-auto">
      <CalendarPlus className="h-12 w-12 text-gray-400 dark:text-gray-500" />
      <h3 className="mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
        This Weekend is Unplanned
      </h3>
      <p className="mt-1 text-gray-500 dark:text-gray-400">
        Your schedule is empty. Add some activities to get started!
      </p>
      <Button className="mt-6"
      onClick={() => navigate("/")}
      >Add Activity</Button>
    </Card>
  );
};
