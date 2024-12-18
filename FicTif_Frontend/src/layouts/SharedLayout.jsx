import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import SideMenuDrawer from "../components/SideMenuDrawer.jsx";
import Loading from "../components/Loading.jsx";
import Footer from "../components/Footer.jsx";

const SharedLayout = () => {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";

  return (
    <>
      <Navbar />
      <SideMenuDrawer>
        {isPageLoading ? <Loading /> : <Outlet />}
      </SideMenuDrawer>
      <Footer />
    </>
  );
};
export default SharedLayout;
