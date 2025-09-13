import { Button } from "./ui/button";
import { ThemeToggle } from "./theme-switcher";
import { Badge } from "./ui/badge";
import { useNavigate, useLocation } from "react-router-dom";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

import { Plus, LayoutGrid, ClipboardList } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currPath = location.pathname;

  const allPlans = useSelector((state: RootState) => state.weekendPlans.plans);

  const totalActivities = useMemo(() => {
    return allPlans.reduce((sum, plan) => sum + plan.activities.length, 0);
  }, [allPlans]);

  return (
    <header className="shadow-sm bg-background/95 backdrop-blur-md sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="weekendly.png" className="h-7 w-7" alt="logo" />
            <div>
              <h1 className="text-lg md:text-xl font-bold text-slate-800 dark:text-slate-200">
                Weekendly
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              variant="default"
              className="text-sm cursor-pointer"
              onClick={() => navigate(currPath === "/plans" ? "/" : "/plans")}
            >
              {currPath === "/plans" ? (
                <span className="flex items-center gap-2">
                  <Plus className="h-4 w-4" /> Add Activities
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <LayoutGrid className="h-4 w-4" /> My Plans
                </span>
              )}
            </Button>

            <Badge
              variant="secondary"
              className="flex items-center gap-2 px-3 py-1.5 bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
            >
              <ClipboardList className="h-4 w-4" />
              <span>{totalActivities}</span>
            </Badge>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
