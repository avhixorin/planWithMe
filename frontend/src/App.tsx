import { Route, Routes } from "react-router-dom";
import Home from "./pages/dashboard/index";
import ActivityPage from "./pages/dashboard/ActivityPage";
import Plans from "./pages/dashboard/PlansPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<ActivityPage />} />
        <Route path="plans" element={<Plans />} />
      </Route>
    </Routes>
  );
};

export default App;
