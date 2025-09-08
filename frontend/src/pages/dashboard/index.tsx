import { useState } from "react";
import { AppSidebar } from "../../components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbPage,
  BreadcrumbItem,
  BreadcrumbList,
} from "../../components/ui/breadcrumb";
import { Separator } from "../../components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "../../components/ui/sidebar";
const getNearestWeekend = (date: Date) => {
  const day = date.getDay();
  if (day === 0 || day === 6) {
    return date;
  }
  const daysUntilSaturday = (6 - day + 7) % 7;
  const nearestSaturday = new Date(date);
  nearestSaturday.setDate(date.getDate() + daysUntilSaturday);
  return nearestSaturday;
}
export default function Dashboard() {
  const [selectedDate, setSelectedDate] = useState<Date>(() => getNearestWeekend(new Date()));
  const handleDateChange = (date: Date | undefined) => {
    if (!date) return;

    const day = date.getDay(); 
    if (day === 0 || day === 6) {
      setSelectedDate(date);
    } else {
      alert("⚠️ Please select a weekend date (Saturday or Sunday).");
    }
  };
  return (
    <SidebarProvider>
      <AppSidebar
        selectedDate={selectedDate}
        setSelectedDate={handleDateChange}
      />
      <SidebarInset>
        <header className="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>
                  {selectedDate.toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-5">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="bg-muted/50 aspect-square rounded-xl" />
            ))}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
