import { Route, Routes } from "react-router-dom";
import Home from "./pages/dashboard/index";
import ActivityPage from "./pages/dashboard/ActivityPage";
import Plans from "./pages/dashboard/PlansPage";
import GroupPlansPage from "./pages/dashboard/GroupPlanPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<ActivityPage />} />
        <Route path="plans" element={<Plans />} />
        <Route path="group-plans" element={<GroupPlansPage />} />
      </Route>
    </Routes>
  );
};

export default App;
