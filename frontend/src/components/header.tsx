import { useSelector } from "react-redux";
import { ThemeToggle } from "./theme-switcher";
import { Separator } from "./ui/separator";
import { SidebarTrigger } from "./ui/sidebar";
import type { RootState } from "../redux/store";

const Header = () => {
  const selectedDate = useSelector(
    (state: RootState) => state.componentSlice.selectedDate
  );
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 justify-between">
      <div className="flex items-center justify-between gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        {selectedDate.toLocaleDateString("en-US", {
          weekday: "long",
          day: "numeric",
          month: "long",
        })}
      </div>
      <div className="flex items-center gap-3 px-8">
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
