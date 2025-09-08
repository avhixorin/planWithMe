import * as React from "react";

import { DatePicker } from "./date-picker";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "./ui/sidebar";
import { NavUser } from "./nav-user";
import { Calendar } from "lucide-react";
import { NavMain } from "./nav-main";
import { dashboardData } from "../constants/options";

const data = {
  user: {
    name: "avhixorin",
    email: "avhixorin@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="py-1">
        <div className="flex justify-around items-center gap-2 rounded-md p-2 w-full">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
            <Calendar className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">Weekendly</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-0 bg-background flex flex-col items-center">
        <NavMain items={dashboardData.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <DatePicker />
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
