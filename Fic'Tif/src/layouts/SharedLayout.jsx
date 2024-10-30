import { Outlet, useLoaderData, useNavigation } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import SideMenuDrawer from "../components/SideMenuDrawer.jsx";
import Loading from "../components/Loading.jsx";
import { useContext, useEffect } from "react";
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
  const isUser = useLoaderData();
  const { globalUser, setGlobalUser } = useContext(UserContext);

  useEffect(() => {
    if (isUser && isUser !== globalUser) {
      setGlobalUser(isUser.user);
      console.log(globalUser);
    }
  }, [globalUser]);

  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";
  return (
    <>
      <Navbar />
      <SideMenuDrawer>
        {isPageLoading ? <Loading /> : <Outlet />}
        {/* <h1>{isUser.user.firstName}</h1> */}
      </SideMenuDrawer>
    </>
  );
};
export default SharedLayout;
