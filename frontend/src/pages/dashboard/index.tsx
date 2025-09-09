import { AppSidebar } from "../../components/app-sidebar";
import { SidebarInset, SidebarProvider } from "../../components/ui/sidebar";
import { Outlet } from "react-router-dom";
import Header from "../../components/header";

export default function Dashboard() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-1 flex-col">
        <Header />
        <div className="flex h-full flex-1 flex-col gap-4 overflow-y-auto min-h-[calc(100vh-4rem)]">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
