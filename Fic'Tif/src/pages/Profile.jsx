import { useAuth } from "../context/useAuth.jsx";
import { useLocation } from "react-router-dom";
import PatientAgenda from "../components/PatientAgenda.jsx";
import DoctorAgenda from "../components/DoctorAgenda.jsx";
import Settings from "../components/Settings.jsx";
import UserProfile from "../components/UserProfile.jsx";
import Loading from "../components/Loading.jsx";

const Profile = () => {
  const { user, checkIfLoggedIn } = useAuth();
  console.log(JSON.stringify(user, null, 2));

  if (user === null) {
    checkIfLoggedIn();
  }

  let { state } = useLocation();

  const initialTab = state ? state.tab : 1;

  return (
    <div
      role="tablist"
      className="tabs-boxed tabs tabs-sm h-full w-full grid-rows-[auto_1fr] content-start rounded-box bg-secondary md:tabs-md lg:tabs-lg"
    >
      <input
        type="radio"
        name="my_tabs_2"
        role="tab"
        className="tab mb-0.5 mr-2 rounded-box font-semibold text-base-100 transition-all duration-300 hover:bg-accent"
        aria-label="Profil"
        defaultChecked={initialTab === 1}
      />
      <div
        role="tabpanel"
        className="tab-content h-full rounded-box border-base-300 bg-base-100 p-6"
      >
        {user !== null ? <UserProfile type={user.role} /> : <Loading />}
      </div>

      <input
        type="radio"
        name="my_tabs_2"
        role="tab"
        className="tab mx-2 mb-0.5 rounded-box font-semibold text-base-100 transition-all duration-300 hover:bg-accent"
        aria-label="Paramètres"
        defaultChecked={initialTab === 2}
      />
      <div
        role="tabpanel"
        className="tab-content h-full rounded-box border-base-300 bg-base-100 p-6"
      >
        <Settings />
      </div>

      <input
        type="radio"
        name="my_tabs_2"
        role="tab"
        className="tab mb-0.5 ml-2 rounded-box font-semibold text-base-100 transition-all duration-300 hover:bg-accent"
        aria-label="Agenda"
        defaultChecked={initialTab === 3}
      />
      <div
        role="tabpanel"
        className="tab-content h-full rounded-box border-base-300 bg-base-100 p-6"
      >
        {user !== null ? (
          user.role === "patient" ? (
            <PatientAgenda />
          ) : (
            <DoctorAgenda />
          )
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};
export default Profile;
