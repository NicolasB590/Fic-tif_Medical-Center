import ThemeToggler from "./ThemeToggler.jsx";
import {
  PiDoorOpenDuotone,
  PiGearSixDuotone,
  PiUserCircleDuotone,
  PiCalendarDotsDuotone,
  PiUserCircleCheckDuotone,
  PiUserCirclePlusDuotone,
} from "react-icons/pi";
import { Link, redirect } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../App.jsx";
import axios from "axios";

const Navbar = () => {
  const { globalUser, setGlobalUser } = useContext(UserContext);
  const [defaultAvatar, setDefaultAvatar] = useState(
    "/user-circle-duotone.svg",
  );

  const handleLogout = async () => {
    await axios("/api/v1/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    setGlobalUser(null);

    return redirect("/");
  };

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
                globalUser
                  ? `Profil de ${globalUser?.lastName} ${globalUser?.firstName}`
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
                  {globalUser?.avatar ? (
                    <img src={`${globalUser?.avatar}`} alt="Image de profil" />
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
              {globalUser ? (
                <>
                  <span className="my-2 text-center font-semibold">{`${globalUser?.lastName} ${globalUser?.firstName}`}</span>
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
                    <Link onClick={() => handleLogout()}>
                      <PiDoorOpenDuotone />
                      Déconnexion
                    </Link>
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
