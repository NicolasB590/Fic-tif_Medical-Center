import ThemeToggler from "./ThemeToggler.jsx";
import { PiDoorOpenDuotone } from "react-icons/pi";
import { PiGearSixDuotone } from "react-icons/pi";
import { PiUserCircleDuotone } from "react-icons/pi";
import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<div className="navbar bg-base-200">
			<div className="flex-1">
				<Link
					to="/"
					className="btn btn-ghost text-3xl text-primary hover:text-secondary"
				>
					{"Fic'Tif"}
				</Link>
			</div>
			<div className="flex-none gap-2">
				<div className="form-control">
					<input
						type="text"
						placeholder="Search"
						className="input input-bordered w-24 md:w-auto"
					/>
				</div>
				{/* {window.innerWidth > 760 ? <ThemeToggler /> : ""} */}
				<ThemeToggler location="main" />
				<div className="dropdown dropdown-end">
					<div
						tabIndex={0}
						role="button"
						className="btn btn-ghost btn-circle avatar"
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
						className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
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
	);
};
export default Navbar;
