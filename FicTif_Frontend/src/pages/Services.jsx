import { Link } from "react-router-dom";
import ServNeurologie from "./ServNeurologie.jsx";

const Services = () => {
  return (
    <div
      role="tablist"
      className="tabs-boxed tabs tabs-sm h-full w-full grid-rows-[auto_1fr] content-start rounded-box md:tabs-md lg:tabs-lg"
    >
      <input
        type="radio"
        name="my_tabs_2"
        role="tab"
        className="tab mb-0.5 rounded-box font-semibold transition-all duration-300 checked:text-base-100 hover:bg-secondary"
        aria-label="Catégorie 1"
        defaultChecked
      />
      <div
        role="tabpanel"
        className="tab-content h-full rounded-box border-base-300 bg-base-100 p-6"
      >
        <ServNeurologie />
      </div>

      <input
        type="radio"
        name="my_tabs_2"
        role="tab"
        className="tab mb-0.5 rounded-box font-semibold transition-all duration-300 checked:text-base-100 hover:bg-secondary"
        aria-label="Catégorie 2"
      />
      <div
        role="tabpanel"
        className="tab-content h-full rounded-box border-base-300 bg-base-100 p-6"
      >
        Tab content 2
      </div>

      <input
        type="radio"
        name="my_tabs_2"
        role="tab"
        className="tab mb-0.5 rounded-box font-semibold transition-all duration-300 checked:text-base-100 hover:bg-secondary"
        aria-label="Catégorie 3"
      />
      <div
        role="tabpanel"
        className="tab-content h-full rounded-box border-base-300 bg-base-100 p-6"
      >
        Tab content 3
      </div>
    </div>
  );
};
export default Services;
