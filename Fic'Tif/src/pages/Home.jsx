import Hero from "../components/Hero.jsx";
import { useContext, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { UserContext } from "../App.jsx";
import axios from "axios";

export const loader = async () => {
  console.log("coin");

  try {
    const { data } = await axios.get("/api/v1/auth/isLogged", {});
    console.log(data);

    if (data) {
      return data;
    } else {
      return null;
    }
  } catch (error) {
    return error;
  }
};

const Home = () => {
  const isUser = useLoaderData();
  const { globalUser, setGlobalUser } = useContext(UserContext);

  useEffect(() => {
    if (isUser && isUser !== globalUser) {
      setGlobalUser(isUser);
    }
  }, []);

  return <Hero />;
};
export default Home;
