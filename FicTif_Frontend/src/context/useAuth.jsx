import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
const apiClient = axios.create({
  baseURL: import.meta.env.API_BASE_URL,
});
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";
import { createAvatar } from "@dicebear/avatars";
import { thumbs } from "@dicebear/collection";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);

  const checkIfLoggedIn = async () => {
    try {
      const { data } = await apiClient.get("/api/v1/auth/isLogged");

      if (data?.user) {
        if (!data.user.avatar) {
          const seed = `${data.user.firstName}${data.user.lastName}`;
          const avatarSvg = createAvatar(thumbs, {
            seed,
            backgroundColor: ["#ffffff"],
            radius: 50,
          });
          data.user.avatar = avatarSvg;
        }

        return data;
      }

      return null;
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
      await apiClient.post("/api/v1/auth/login", {
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
      await apiClient.post("/api/v1/auth/logout", {
        credentials: "include",
      });

      setUser(null);
      setIsLogged(false);

      toast.success("Vous êtes maintenant déconnecté");
    } catch (error) {
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

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
