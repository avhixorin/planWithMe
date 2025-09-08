import { Activity, Calendar, House } from "lucide-react";

export const dashboardData = {
  navMain: [
    {
      title: "Home",
      url: "/dashboard",
      icon: House,
      isActive: true,
    },
    {
      title: "Group Plans",
      url: "/dashboard/group-plans",
      icon: Calendar,
    },
    {
      title: "Manage plans",
      url: "/dashboard/manage-plans",
      icon: Activity,
    },
  ],
};
