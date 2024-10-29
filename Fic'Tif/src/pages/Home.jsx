import Hero from "../components/Hero.jsx";
import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { UserContext } from "../App.jsx";
import axios from "axios";

export const loader = async () => {
  const { globalUser, setGlobalUser } = useContext(UserContext);
  try {
    const { data } = await axios.get("/api/v1/users/isLogged", {});
  } catch (error) {
    console.log(error);
  }
};

const Home = () => {
  return <Hero />;
};
export default Home;
