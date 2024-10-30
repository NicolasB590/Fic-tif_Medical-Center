import ThemeToggler from "./ThemeToggler.jsx";
import {
  PiDoorOpenDuotone,
  PiGearSixDuotone,
  PiUserCircleDuotone,
  PiCalendarDotsDuotone,
} from "react-icons/pi";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../App.jsx";

const Navbar = () => {
  const { globalUser } = useContext(UserContext);

  console.log(
    `NAVBAR: ${globalUser ? globalUser.firstName : "Aucun utilisateur"}`,
  );

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
          {globalUser ? (
            <div className="dropdown dropdown-end">
              <div
                className="tooltip tooltip-left tooltip-primary"
                data-tip={`Profile de ${globalUser.lastName} ${globalUser.firstName}`}
                // data-tip={`Sam`}
              >
                <div
                  tabIndex={0}
                  role="button"
                  className="avatar btn btn-circle btn-ghost"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                  </div>
                </div>
              </div>

              <ul
                tabIndex={0}
                className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
              >
                <span className="my-2 text-center font-semibold">{`${globalUser.lastName} ${globalUser.firstName}`}</span>
                <li>
                  <Link to="/profile" state={{ tab: 1 }}>
                    <PiUserCircleDuotone />
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/profile" state={{ tab: 2 }}>
                    <PiGearSixDuotone />
                    Settings
                  </Link>
                </li>
                <li>
                  <Link to="/profile" state={{ tab: 3 }}>
                    <PiCalendarDotsDuotone />
                    Agenda
                  </Link>
                </li>
                <li>
                  <Link to="/profile" state={{ tab: 4 }}>
                    <PiDoorOpenDuotone />
                    Logout
                  </Link>
                </li>
                <ThemeToggler location="profile" />
              </ul>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};
export default Navbar;
