import {
  Activity,
  Calendar,
  House,
} from "lucide-react";

export const dashboardData = {
  navMain: [
    {
      title: "Home",
      url: "/dashboard",
      icon: House,
      isActive: true,
    },
    {
      title: "Add plans",
      url: "/dashboard/api-keys",
      icon: Calendar,
    },
    {
      title: "Add Activities",
      url: "/dashboard/models",
      icon: Activity,
    },
  ],
};
