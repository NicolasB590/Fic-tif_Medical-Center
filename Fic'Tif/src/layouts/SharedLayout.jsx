import { Outlet, useLoaderData, useNavigation } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import SideMenuDrawer from "../components/SideMenuDrawer.jsx";
import Loading from "../components/Loading.jsx";
import { useContext } from "react";
import axios from "axios";
import { UserContext } from "../App.jsx";

export const loader = async () => {
  try {
    const { data } = await axios.get("/api/v1/auth/isLogged");

    if (data) {
      return data;
    } else {
      return null;
    }
  } catch (error) {
    if (error.status === 401) {
      return null;
    }
    return error;
  }
};

const SharedLayout = () => {
  const data = useLoaderData();
  console.log(data, "hared");
  const { globalUser, setGlobalUser } = useContext(UserContext);

  if (globalUser === null && data) {
    setGlobalUser(data.user);
  }

  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";

  return (
    <>
      <Navbar user={data?.user} />
      <SideMenuDrawer>
        {isPageLoading ? <Loading /> : <Outlet />}
      </SideMenuDrawer>
    </>
  );
};
export default SharedLayout;
