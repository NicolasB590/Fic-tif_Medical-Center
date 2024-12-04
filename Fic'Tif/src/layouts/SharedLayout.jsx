import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import SideMenuDrawer from "../components/SideMenuDrawer.jsx";
import Loading from "../components/Loading.jsx";
// import { useAuth } from "../context/useAuth.jsx";

const SharedLayout = () => {
  // const { user } = useAuth();
  // const data = user;

  // console.log(data);

  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";

  return (
    <>
      <Navbar />
      <SideMenuDrawer>
        {isPageLoading ? <Loading /> : <Outlet />}
      </SideMenuDrawer>
    </>
  );
};
export default SharedLayout;
