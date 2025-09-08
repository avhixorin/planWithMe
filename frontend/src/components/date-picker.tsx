import { useDispatch, useSelector } from "react-redux";
import { Calendar } from "./ui/calendar";
import { SidebarGroup, SidebarGroupContent } from "./ui/sidebar";
import type { RootState } from "../redux/store";
import { setSelectedDate } from "../redux/slices/componentSlice";

export function DatePicker() {
  const selectedDate = useSelector(
    (state: RootState) => state.componentSlice.selectedDate
  );
  const dispatch = useDispatch();
  const handleDateChange = (date: Date | undefined) => {
    if (!date) return;
    dispatch(setSelectedDate(date));
  };
  return (
    <SidebarGroup className="px-0">
      <SidebarGroupContent>
        <Calendar
          mode="single"
          disabled={(date: Date) => {
            const day = date.getDay();
            return day !== 0 && day !== 6;
          }}
          selected={selectedDate}
          onSelect={(date: Date | undefined) => {
            if (date) {
              handleDateChange(date);
            }
          }}
          startMonth={
            new Date(new Date().getFullYear(), new Date().getMonth(), 1)
          }
          className="[&_[role=gridcell].bg-accent]:bg-sidebar-primary [&_[role=gridcell].bg-accent]:text-sidebar-primary-foreground [&_[role=gridcell]]:w-[33px]"
        />
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
