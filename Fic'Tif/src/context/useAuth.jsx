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
        return data;
      } else {
        return null;
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
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
    let isMounted = true;

    const loadUser = async () => {
      const data = await checkIfLoggedIn();
      if (isMounted) {
        setUser(data?.user || null);
      }
    };

    loadUser();

    return () => {
      isMounted = false;
    };
  }, [isLogged]);

  const login = async (email, password) => {
    try {
      await axios.post("/api/v1/auth/login", {
        email,
        password,
      });

      setIsLogged(true);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          toast.error("Identifiants incorrects. Veuillez réessayer.");
        } else {
          toast.error(
            error.response.data.message || "Une erreur est survenue.",
          );
        }
      } else {
        toast.error("Erreur de connexion. Vérifiez votre connexion réseau.");
      }
    }
  };

  const logout = async () => {
    try {
      await axios("/api/v1/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      setUser(null);
      setIsLogged(false);

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
