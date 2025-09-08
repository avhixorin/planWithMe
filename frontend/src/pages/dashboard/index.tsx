import { AppSidebar } from "../../components/app-sidebar";
import { SidebarInset, SidebarProvider } from "../../components/ui/sidebar";
import { Outlet } from "react-router-dom";
import Header from "../../components/header";

export default function Dashboard() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <div className="flex flex-1 flex-col gap-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
