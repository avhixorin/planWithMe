import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import DashboardHome from "./pages/dashboard/home";
import GroupPlans from "./pages/dashboard/group-plans";
import ManagePlans from "./pages/dashboard/manage-plans";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route index element={<DashboardHome />} />
        <Route path="group-plans" element={<GroupPlans />} />
        <Route path="manage-plans" element={<ManagePlans />} />
      </Route>
    </Routes>
  );
};

export default App;
