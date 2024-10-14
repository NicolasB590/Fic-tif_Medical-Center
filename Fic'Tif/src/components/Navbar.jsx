import ThemeToggler from "./ThemeToggler.jsx";
import { PiDoorOpenDuotone } from "react-icons/pi";
import { PiGearSixDuotone } from "react-icons/pi";
import { PiUserCircleDuotone } from "react-icons/pi";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar justify-center bg-base-200">
      <div className="flex w-full flex-row lg:max-w-screen-lg">
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
            <ul
              tabIndex={0}
              className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
            >
              <li>
                <a>
                  <PiUserCircleDuotone />
                  Profile
                </a>
              </li>
              <li>
                <a>
                  <PiGearSixDuotone />
                  Settings
                </a>
              </li>
              <li>
                <a>
                  <PiDoorOpenDuotone />
                  Logout
                </a>
              </li>
              <ThemeToggler location="profile" />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
