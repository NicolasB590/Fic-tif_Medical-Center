import ThemeToggler from "./ThemeToggler.jsx";
import {
  PiDoorOpenDuotone,
  PiGearSixDuotone,
  PiUserCircleDuotone,
  PiCalendarDotsDuotone,
  PiUserCircleCheckDuotone,
  PiUserCirclePlusDuotone,
} from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/useAuth.jsx";
import SearchDoctors from "./SearchDoctors.jsx";

const Navbar = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [defaultAvatar, setDefaultAvatar] = useState(
    "/user-circle-duotone.svg",
  );

  const { user, logout } = useAuth();

  const logoutHandler = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="navbar justify-center bg-base-200">
      <div className="flex w-full flex-row xl:max-w-screen-xl">
        <h1 className="flex-1">
          <Link
            to="/"
            className="btn btn-ghost text-3xl text-primary hover:text-secondary"
          >
            {"Fic'Tif"}
          </Link>
        </h1>
        <div className="relative flex gap-2">
          <SearchDoctors />
          <ThemeToggler location="main" />

          <div className="dropdown dropdown-end">
            <div
              className="tooltip tooltip-left tooltip-primary"
              data-tip={
                user
                  ? `Profil de ${user?.lastName} ${user?.firstName}`
                  : `Créer un compte/Se connecter`
              }
            >
              <div
                tabIndex={0}
                role="button"
                className="avatar btn btn-circle btn-ghost"
              >
                <div
                  className="w-10 rounded-full transition duration-300"
                  onMouseEnter={() =>
                    setDefaultAvatar("/user-circle-duotone-secondary.svg")
                  }
                  onMouseLeave={() =>
                    setDefaultAvatar("/user-circle-duotone.svg")
                  }
                >
                  {user?.avatar ? (
                    user.avatar.trim().startsWith("<svg") ? (
                      <div
                        dangerouslySetInnerHTML={{ __html: user.avatar }}
                        className="h-full w-full"
                      />
                    ) : (
                      <img src={`${user.avatar}`} alt="Image de profil" />
                    )
                  ) : (
                    <PiUserCircleDuotone className="text-[40px] text-primary transition-all duration-500 hover:text-secondary md:text-[40px]" />
                  )}
                </div>
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
            >
              {user ? (
                <>
                  <span className="my-2 text-center font-semibold">{`${user?.lastName} ${user?.firstName}`}</span>
                  <li>
                    <Link to="/profile" state={{ tab: 1 }}>
                      <PiUserCircleDuotone />
                      Profil
                    </Link>
                  </li>
                  <li>
                    <Link to="/profile" state={{ tab: 2 }}>
                      <PiGearSixDuotone />
                      Paramètres
                    </Link>
                  </li>
                  <li>
                    <Link to="/profile" state={{ tab: 3 }}>
                      <PiCalendarDotsDuotone />
                      Agenda
                    </Link>
                  </li>
                  <li>
                    <button onClick={() => logoutHandler()}>
                      <PiDoorOpenDuotone />
                      Déconnexion
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login">
                      <PiUserCircleCheckDuotone />
                      Connexion
                    </Link>
                  </li>
                  <li>
                    <Link to="/register">
                      <PiUserCirclePlusDuotone />
                      S&apos;enregistrer
                    </Link>
                  </li>
                </>
              )}

              <ThemeToggler location="profile" />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
