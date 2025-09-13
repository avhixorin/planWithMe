import { Button } from "./ui/button";
import { ThemeToggle } from "./theme-switcher";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold">Weekendly</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Plan your perfect weekend
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Button className="text-xs" onClick={() => navigate("/plans")}>
              My Plans
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
            {/* <Badge variant="secondary">
              {selectedActivities.length} activities
            </Badge> */}
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
