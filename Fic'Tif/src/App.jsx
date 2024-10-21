import { useState, createContext } from "react";
import SharedLayout from "./layouts/SharedLayout.jsx";
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Services from "./pages/Services.jsx";
import Appointment from "./pages/Appointment.jsx";
import axios from "axios";
// import Appointment2 from "./pages/Appointment2.jsx";
import "react-big-calendar/lib/css/react-big-calendar.css";

export const ThemeContext = createContext(null);

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
      // errorElement: <ErrorPage />,
      element: <SharedLayout />,
      children: [
        {
          index: true,
          element: <Home />,
          errorElement: <div>Error</div>,
          // loader: cocktailsLoader,
        },
        {
          path: "doctors",
          element: <Services />,
          errorElement: <div>Error</div>,
          // loader: cocktailsLoader,
        },
        {
          path: "appointment",
          element: <Appointment />,
          errorElement: <div>Error</div>,
          action: async ({ request }) => {
            console.log("coin");

            const formData = await request.formData();
            const doctor = formData.get("doctor");
            const reservedDate = formData.get("reservedDate");

            if (!doctor || !reservedDate) {
              throw new Error(
                "Docteur ou date de rendez-vous non sélectionné.",
              );
            }

            try {
              const { data } = await axios.post(
                "http://localhost:5000/api/v1/appointments",
                {
                  date: reservedDate,
                  doctorId: doctor,
                  patientId: "6707d96b65816cd4c6b4dd38",
                },
              );

              console.log("Rendez-vous confirmé :", data);

              return redirect("/");
            } catch (error) {
              console.log(error);
            }
          },
          // loader: cocktailsLoader,
        },
      ],
    },
  ]);

  return (
    <main className="relative flex min-h-dvh flex-col items-center bg-base-300">
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <RouterProvider router={router} />
      </ThemeContext.Provider>
    </main>
  );
};
export default App;
