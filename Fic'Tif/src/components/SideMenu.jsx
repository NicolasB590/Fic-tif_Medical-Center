import { PiDiamondDuotone } from "react-icons/pi";
import { NavLink } from "react-router-dom";

const SideMenu = () => {
  return (
    <ul className="menu h-full w-56 bg-base-100 text-primary">
      <li>
        <NavLink
          to="/"
          className="hover:font-semibold hover:text-secondary active:font-semibold"
        >
          Accueil
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/appointment"
          className="hover:font-semibold hover:text-secondary active:font-semibold enabled:text-primary"
        >
          Prendre rendez-vous
          <span className="animate-bounce font-semibold text-secondary">
            !!
          </span>
        </NavLink>
      </li>
      <li>
        <details open>
          <summary className="font-bold text-primary hover:text-secondary">
            <PiDiamondDuotone />
            Nous découvrir
          </summary>
          <ul>
            <li>
              <NavLink
                to="/doctors"
                className="hover:font-semibold hover:text-secondary active:font-semibold"
              >
                Le centre
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/doctors"
                className="hover:font-semibold hover:text-secondary active:font-semibold"
              >
                Nos Spécialités
              </NavLink>
            </li>
            <li>
              <details open>
                <summary className="font-bold hover:text-secondary">
                  <PiDiamondDuotone />
                  Liste
                </summary>
                <ul>
                  <li>
                    <a className="hover:font-semibold hover:text-secondary active:font-semibold">
                      Spécialité 1
                    </a>
                  </li>
                  <li>
                    <a className="hover:font-semibold hover:text-secondary active:font-semibold">
                      Spécialité 2
                    </a>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <a className="hover:font-semibold hover:text-secondary active:font-semibold">
          Fic&apos;Tif et vous
        </a>
      </li>
    </ul>
  );
};
export default SideMenu;
