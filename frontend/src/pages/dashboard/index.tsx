import Header from "../../components/header";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-background w-full flex-col md:flex">
      <Header />
      <Outlet />
    </div>
  );
};
export default Home;
