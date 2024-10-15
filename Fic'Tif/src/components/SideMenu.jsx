import { PiDiamondDuotone } from "react-icons/pi";
import { NavLink } from "react-router-dom";

const NavLinkClassSettings =
  "hover:bg-base-200 hover:font-semibold hover:text-secondary active:bg-base-300 active:font-semibold";
const SummaryClassSettings =
  "hover:bg-base-200 font-bold hover:text-secondary active:bg-base-300 active:font-semibold";

const SideMenu = () => {
  return (
    <ul className="menu h-full w-56 bg-base-100 text-primary">
      <li>
        <NavLink to="/" className={NavLinkClassSettings}>
          Accueil
        </NavLink>
      </li>
      <li>
        <NavLink to="/appointment" className={NavLinkClassSettings}>
          Prendre rendez-vous
          <span className="animate-bounce font-semibold text-secondary">
            !!
          </span>
        </NavLink>
      </li>
      <li>
        <details open>
          <summary className={SummaryClassSettings}>
            <PiDiamondDuotone />
            Nous découvrir
          </summary>
          <ul>
            <li>
              <NavLink to="/doctors" className={NavLinkClassSettings}>
                Le centre
              </NavLink>
            </li>
            <li>
              <NavLink to="/doctors" className={NavLinkClassSettings}>
                Nos Spécialités
              </NavLink>
            </li>
            <li>
              <details open>
                <summary className={SummaryClassSettings}>
                  <PiDiamondDuotone />
                  Liste
                </summary>
                <ul>
                  <li>
                    <a className={NavLinkClassSettings}>Spécialité 1</a>
                  </li>
                  <li>
                    <a className={NavLinkClassSettings}>Spécialité 2</a>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <a className={NavLinkClassSettings}>Fic&apos;Tif et vous</a>
      </li>
    </ul>
  );
};
export default SideMenu;
