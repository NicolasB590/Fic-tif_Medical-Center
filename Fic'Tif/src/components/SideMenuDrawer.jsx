import { PiCaretLeftDuotone } from "react-icons/pi";
import SideMenu from "./SideMenu.jsx";

const SideMenuDrawer = ({ children }) => {
  return (
    <div className="drawer relative flex-1 bg-base-100 lg:drawer-open xl:max-w-screen-xl">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center p-6">
        {children}
        <label
          htmlFor="my-drawer-2"
          className="btn fixed bottom-2 left-1 animate-bounce cursor-pointer text-4xl text-primary transition-all duration-500 hover:text-secondary lg:hidden"
        >
          <PiCaretLeftDuotone />
        </label>
      </div>
      <div className="drawer-side h-full">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <SideMenu />
      </div>
    </div>
  );
};
export default SideMenuDrawer;
