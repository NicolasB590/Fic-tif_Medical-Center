import { useContext, useState } from "react";
import { UserContext } from "../App.jsx";
import {
  PiNotePencilDuotone,
  PiStethoscopeDuotone,
  PiUserCircleDuotone,
} from "react-icons/pi";

const UserProfile = ({ type }) => {
  const { globalUser } = useContext(UserContext);

  const [isEditing, setIsEditing] = useState({
    email: false,
    address: false,
    birthDate: false,
    phoneNumber: false,
  });

  const date = new Date(globalUser.birthDate);
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear();

  const [formData, setFormData] = useState({
    avatar: globalUser.avatar,
    email: globalUser.email,
    address: globalUser.address,
    birthDate: `${day}/${month}/${year}`,
    phoneNumber: globalUser.phoneNumber,
  });

  console.log(globalUser.adress);

  const handleEditClick = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (field) => {
    // Ici, tu pourrais appeler une fonction pour mettre à jour les données sur le backend
    console.log(`Updating ${field}:`, formData[field]);

    setIsEditing((prev) => ({ ...prev, [field]: false }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, avatar: reader.result }));
        // Ici, tu pourrais appeler une fonction pour envoyer le fichier au backend
      };
      reader.readAsDataURL(file);
    }
  };

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
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 cursor-pointer rounded-full opacity-0" // Masquer l'input de type file
                  id="file-input"
                />
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
            {["email", "address", "birthDate", "phoneNumber"].map(
              (field, index) => (
                <p className="flex items-center gap-2" key={index}>
                  {field === "birthDate"
                    ? "Date de naissance : "
                    : `${field.charAt(0).toUpperCase() + field.slice(1)} : `}
                  {isEditing[field] ? (
                    <>
                      <input
                        type={field === "birthDate" ? "date" : "text"}
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        className="input input-bordered w-6/12"
                      />
                      <button
                        onClick={() => handleSave(field)}
                        className="btn btn-primary"
                      >
                        Enregistrer
                      </button>
                    </>
                  ) : (
                    <>
                      <span>{formData[field]}</span>
                      <button
                        onClick={() => handleEditClick(field)}
                        className="btn btn-ghost text-2xl text-primary transition duration-300 hover:text-secondary"
                      >
                        <PiNotePencilDuotone />
                      </button>
                    </>
                  )}
                </p>
              ),
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
