import { Button } from "./ui/button";
import { ThemeToggle } from "./theme-switcher";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { Badge } from "./ui/badge";

const Header = () => {
  const navigate = useNavigate();
  const currPath = window.location.pathname;
  console.log("Current Path:", currPath);
  const allPlans = useSelector((state: RootState) => state.weekendPlans.plans);
  const totalActivities = useMemo(() => {
    return allPlans.reduce((sum, plan) => sum + plan.activities.length, 0);
  }, [allPlans]);
  return (
    <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-start sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-lg md:text-2xl font-bold">Weekendly</h1>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
              Plan your perfect weekend
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Button
              className="text-xs"
              onClick={() => navigate(currPath === "/plans" ? "/" : "/plans")}
            >
              {currPath === "/plans" ? "Add activities" : "My Plans"}
            </Button>

            {/* {lastSaved && (
              <Badge
                variant="outline"
                className="hidden md:flex items-center gap-1"
              >
                <Save className="h-3 w-3" />
                Saved {lastSaved.toLocaleTimeString()}
              </Badge>
            )} */}
            <Badge variant="secondary">{totalActivities} activities</Badge>
            {/* {selectedActivities.length > 0 && (
              <>
                <ExportDialog activities={selectedActivities}>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Share2 className="h-4 w-4" />
                    Export
                  </Button>
                </ExportDialog>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsClearConfirmOpen(true)}
                  className="flex items-center gap-2 text-slate-500 hover:text-red-500"
                >
                  <RotateCcw className="h-4 w-4" />
                  Clear All
                </Button>
              </>
            )} */}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
