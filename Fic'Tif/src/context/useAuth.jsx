import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);

  const checkIfLoggedIn = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/isLogged");

      if (data) {
        console.log(data.user);

        // setUser(data.user);
        return data;
      } else {
        // setUser(null);
        return null;
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // setUser(null);
        return null;
      }
      console.error(
        "Erreur lors de la vérification de l'authentification",
        error,
      );
      return error;
    }
  };

  useEffect(() => {
    let isMounted = true; // Flag pour vérifier si le composant est monté

    const loadUser = async () => {
      const data = await checkIfLoggedIn();
      if (isMounted) {
        // Mettez à jour l'état seulement si le composant est monté
        setUser(data?.user || null);
      }
    };

    loadUser();

    return () => {
      isMounted = false; // Cleanup, met le flag à false quand le composant est démonté
    };
  }, [isLogged]); // Exécute à chaque fois que `isLogged` change

  // useEffect(() => {
  //   checkIfLoggedIn();

  //   console.log("j'existe");
  // }, [isLogged]);

  const login = async (email, password) => {
    try {
      await axios.post("/api/v1/auth/login", {
        email,
        password,
      });

      setIsLogged(true);
      // if (response) {
      //   const user = await axios.get("api/v1/users",
      // }

      // checkIfLoggedIn();
    } catch (error) {
      console.error("Erreur de connexion", error);
    }
  };

  const logout = async () => {
    try {
      await axios("/api/v1/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      setUser(null);

      toast.success("Vous êtes maintenant déconnecté");
    } catch (error) {
      console.log(error);

      toast.error(
        error?.msg
          ? error.msg
          : "Une erreur est survenue lors de la déconnexion",
      );
    }

    return redirect("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, checkIfLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
