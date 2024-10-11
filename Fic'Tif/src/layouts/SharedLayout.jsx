import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import SideMenuDrawer from "../components/SideMenuDrawer.jsx";

const SharedLayout = () => {
  return (
    <>
      <Navbar />
      <SideMenuDrawer>
        <Outlet />
      </SideMenuDrawer>
    </>
  );
};
export default SharedLayout;
