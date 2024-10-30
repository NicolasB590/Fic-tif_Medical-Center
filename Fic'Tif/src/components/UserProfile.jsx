import { useContext } from "react";
import { UserContext } from "../App.jsx";
import { PiNotePencilDuotone, PiStethoscopeDuotone } from "react-icons/pi";

const UserProfile = ({ type }) => {
  const { globalUser } = useContext(UserContext);

  return (
    <>
      {type === "patient" ? (
        <div>PatientProfile</div>
      ) : (
        <div className="flex flex-col gap-4 md:text-2xl">
          {type === "doctor" ? (
            <p className="flex items-center gap-2">
              Docteur <PiStethoscopeDuotone />
            </p>
          ) : (
            ""
          )}
          <p className="flex items-center gap-2">
            Nom : <span>{globalUser.lastName}</span> <PiNotePencilDuotone />
          </p>
          <p className="flex items-center gap-2">
            Prénom : <span>{globalUser.firstName}</span> <PiNotePencilDuotone />
          </p>
          <p className="flex items-center gap-2">
            Email : <span>{globalUser.email}</span> <PiNotePencilDuotone />
          </p>
          <p className="flex items-center gap-2">
            Adresse : <span>{globalUser.adress}</span> <PiNotePencilDuotone />
          </p>
          <p className="flex items-center gap-2">
            Date de naissance : <span>{globalUser.birthDate}</span>{" "}
            <PiNotePencilDuotone />
          </p>
          <p className="flex items-center gap-2">
            Numéro de téléphone : <span>{globalUser.phoneNumber}</span>{" "}
            <PiNotePencilDuotone />
          </p>
        </div>
      )}
    </>
  );
};
export default UserProfile;
