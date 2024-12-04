import ThemeToggler from "./ThemeToggler.jsx";
import {
  PiDoorOpenDuotone,
  PiGearSixDuotone,
  PiUserCircleDuotone,
  PiCalendarDotsDuotone,
  PiUserCircleCheckDuotone,
  PiUserCirclePlusDuotone,
} from "react-icons/pi";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/useAuth.jsx";

const Navbar = () => {
  const [defaultAvatar, setDefaultAvatar] = useState(
    "/user-circle-duotone.svg",
  );

  const { user, logout } = useAuth();

  // console.log(user);

  return (
    <div className="navbar justify-center bg-base-200">
      <div className="flex w-full flex-row xl:max-w-screen-xl">
        <div className="flex-1">
          <Link
            to="/"
            className="btn btn-ghost text-3xl text-primary hover:text-secondary"
          >
            {"Fic'Tif"}
          </Link>
        </div>
        <div className="flex gap-2">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
            />
          </div>
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
                    <img src={`${user?.avatar}`} alt="Image de profil" />
                  ) : (
                    <img src={defaultAvatar} alt="Image de profil" />
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
                    <button onClick={() => logout()}>
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
