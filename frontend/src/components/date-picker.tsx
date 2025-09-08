import { Calendar } from "./ui/calendar";
import { SidebarGroup, SidebarGroupContent } from "./ui/sidebar";

export function DatePicker({
  selectedDate,
  setSelectedDate,
}: {
  selectedDate: Date;
  setSelectedDate: (date: Date | undefined) => void;
}) {
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
              setSelectedDate(date);
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
