import { useContext } from "react";
import { UserContext } from "../App.jsx";
import {
  PiNotePencilDuotone,
  PiStethoscopeDuotone,
  PiUserCircleDuotone,
} from "react-icons/pi";

const UserProfile = ({ type }) => {
  const { globalUser } = useContext(UserContext);

  console.log(globalUser.birthDate);

  const date = new Date(globalUser.birthDate);

  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear();

  return (
    <>
      {type === "patient" ? (
        <div>PatientProfile</div>
      ) : (
        <div className="flex flex-col gap-12 text-sm md:text-2xl">
          <div className="flex flex-col gap-4">
            <div className="w-fit cursor-pointer self-center rounded-full">
              <div className="absolute z-10 flex h-16 w-16 items-center justify-center rounded-full bg-base-100 bg-opacity-70 text-xs font-semibold text-secondary opacity-0 transition duration-300 hover:opacity-100 md:h-32 md:w-32 md:text-xl">
                <span className="">Modifier</span>
              </div>

              <div className="avatar">
                <div className="w-16 self-center rounded-full md:w-32">
                  {globalUser?.avatar ? (
                    <img src={`${globalUser?.avatar}`} alt="Image de profil" />
                  ) : (
                    <PiUserCircleDuotone className="text-9xl" />
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-row gap-2 self-center">
              {type === "doctor" ? (
                <span className="flex gap-1 text-3xl">
                  <PiStethoscopeDuotone /> Docteur
                </span>
              ) : (
                ""
              )}
              <span className="self-end text-base md:text-2xl">{`${globalUser.lastName} ${globalUser.firstName}`}</span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <p className="flex items-center gap-2">
              Email : <span>{globalUser.email}</span>{" "}
              <PiNotePencilDuotone className="cursor-pointer text-primary transition duration-300 hover:text-secondary" />
            </p>
            <p className="flex items-center gap-2">
              Adresse : <span>{globalUser.adress}</span>{" "}
              <PiNotePencilDuotone className="cursor-pointer text-primary transition duration-300 hover:text-secondary" />
            </p>
            <p className="flex items-center gap-2">
              Date de naissance : <span>{`${day}/${month}/${year}`}</span>{" "}
              <PiNotePencilDuotone className="cursor-pointer text-primary transition duration-300 hover:text-secondary" />
            </p>
            <p className="flex items-center gap-2">
              Numéro de téléphone : <span>{globalUser.phoneNumber}</span>{" "}
              <PiNotePencilDuotone className="cursor-pointer text-primary transition duration-300 hover:text-secondary" />
            </p>
          </div>
        </div>
      )}
    </>
  );
};
export default UserProfile;
