import { useState } from "react";
import { useAuth } from "../context/useAuth.jsx";
import {
  PiNotePencilDuotone,
  PiStethoscopeDuotone,
  PiUserCircleDuotone,
} from "react-icons/pi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserProfile = ({ type }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const formatDate = (date) => {
    if (!date) return "";
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
  };

  const [isEditing, setIsEditing] = useState({
    email: false,
    address: false,
    birthDate: false,
    phoneNumber: false,
  });

  const [formData, setFormData] = useState({
    avatar: user.avatar,
    email: user.email,
    address: user.address,
    birthDate: formatDate(new Date(user.birthDate)),
    phoneNumber: user.phoneNumber,
  });

  console.log(user._id);

  const handleEditClick = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;

  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: name === "birthDate" ? formatDate(value) : value,
  //   }));
  // };

  const handleSave = async (field) => {
    console.log(`Updating ${field}:`, formData[field]);

    try {
      await axios.put(`/api/v1/users`, { [field]: formData[field] });
    } catch (error) {
      console.log(error);
    }

    if (field === "email") {
      toast.info(
        "Modification des informations de connexion, veuillez vous reconnecter",
      );

      logout();

      navigate("/login");
    } else {
      window.location.reload();
    }

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
                  {user?.avatar ? (
                    <img src={`${user?.avatar}`} alt="Image de profil" />
                  ) : (
                    <PiUserCircleDuotone className="text-[64px] md:text-9xl" />
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
              <span className="self-end text-base md:text-2xl">{`${user.lastName} ${user.firstName}`}</span>
            </div>
          </div>
          <dl className="m-auto flex flex-col gap-3 md:w-5/6">
            {["email", "address", "birthDate", "phoneNumber"].map(
              (field, index) => (
                <div
                  className="grid md:grid-cols-[14rem_1fr] md:gap-2"
                  key={index}
                >
                  {field === "birthDate" ? (
                    <dt className="self-center font-bold">
                      {"Date de naissance : "}
                    </dt>
                  ) : (
                    <dt className="self-center font-bold">
                      {field.charAt(0).toUpperCase() + field.slice(1) + ` : `}
                    </dt>
                  )}
                  {isEditing[field] ? (
                    <div className="grid grid-cols-[1fr_6rem] gap-2">
                      <input
                        type={field === "birthDate" ? "date" : "text"}
                        name={field}
                        // value={formData[field]}
                        // onChange={handleChange}
                        className="input input-bordered max-w-36 md:max-w-full"
                      />
                      <button
                        onClick={() => handleSave(field)}
                        className="btn btn-primary"
                      >
                        Enregistrer
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-[1fr_4rem] gap-2">
                      <dd className="self-center">{formData[field]}</dd>
                      <button
                        onClick={() => handleEditClick(field)}
                        className="btn btn-ghost self-center text-xl text-primary transition duration-300 hover:text-secondary md:text-2xl"
                      >
                        <PiNotePencilDuotone />
                      </button>
                    </div>
                  )}
                </div>
              ),
            )}
          </dl>
        </div>
      )}
    </>
  );
};

export default UserProfile;
