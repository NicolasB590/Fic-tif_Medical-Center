import { useState, createContext } from "react";
import SharedLayout from "./layouts/SharedLayout.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Services from "./pages/Services.jsx";
import Appointment from "./pages/Appointment.jsx";
import { action as appointmentAction } from "./pages/Appointment.jsx";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import { action as registerAction } from "./pages/Register.jsx";
import Profile from "./pages/Profile.jsx";

import { AuthProvider } from "./context/useAuth.jsx";
import DoctorPage from "./pages/DoctorPage.jsx";

export const ThemeContext = createContext(null);
export const UserContext = createContext(null);

const initTheme = () => {
  const storedTheme = localStorage.getItem("theme");

  if (storedTheme === "cupcake" || storedTheme === "dim") {
    document.querySelector("html").setAttribute("data-theme", storedTheme);
    return storedTheme;
  } else {
    return "cupcake";
  }
};

const App = () => {
  const [theme, setTheme] = useState(() => initTheme());

  const toggleTheme = (theme) => {
    setTheme(theme);
    document.querySelector("html").setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <SharedLayout />,
      children: [
        {
          index: true,
          element: <Home />,
          errorElement: <div>Error</div>,
        },
        {
          path: "doctors",
          element: <Services />,
          errorElement: <div>Error</div>,
        },
        {
          path: "appointment/:id?",
          element: <Appointment />,
          errorElement: <div>Error</div>,
          action: appointmentAction,
        },
        {
          path: "profile",
          element: <Profile />,
          errorElement: <div>Error</div>,
        },
        {
          path: "doctorPage",
          element: <DoctorPage />,
          errorElement: <div>Error</div>,
        },
      ],
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "register",
      element: <Register />,
      action: registerAction,
    },
  ]);

  return (
    <main className="relative flex min-h-dvh flex-col items-center bg-base-300">
      <AuthProvider>
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme={theme === "cupcake" ? "light" : "dark"}
            transition={Bounce}
          />
          <RouterProvider router={router} />
        </ThemeContext.Provider>
      </AuthProvider>
    </main>
  );
};
export default App;
