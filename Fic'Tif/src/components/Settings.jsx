import { useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth.jsx";

const Settings = () => {
  const modalRef = useRef(null);

  const { logout } = useAuth();

  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    try {
      await axios.delete("/api/v1/users/");
      toast.success("Votre compte a été supprimé avec succès.");

      logout();

      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la suppression du compte", error);
      toast.error("Une erreur est survenue lors de la suppression.");
    }
  };

  const handleChangePassword = async () => {
    try {
      await axios.put("/api/v1/users/", {
        password: newPassword,
      });
      toast.success("Mot de passe changé avec succès.");
      setIsChangingPassword(false);
      toast.info(
        "Modification des informations de connexion, veuillez vous reconnecter",
      );

      logout();

      navigate("/login");
    } catch (error) {
      console.error("Erreur lors du changement de mot de passe", error);
      toast.error(
        "Une erreur est survenue lors du changement de mot de passe.",
      );
    }
  };

  return (
    <div>
      <div className="m-auto mb-4 flex w-fit flex-col items-center justify-center gap-4">
        <p className="text-center">
          Si vous souhaitez supprimer votre compte Fic&apos;Tif, cliquez sur le
          bouton ci-dessous.
        </p>
        <span className="text-center font-semibold text-error">
          Attention, cette action est irréversible!
        </span>
        <button
          className="btn btn-primary text-base-100 hover:btn-error"
          onClick={() => modalRef.current.showModal()}
        >
          Supprimer le compte
        </button>
      </div>

      <div className="divider" />

      <div className="m-auto mt-4 flex w-fit flex-col items-center justify-center gap-4">
        <p className="text-center">
          Si vous souhaitez changer le mot de passe de votre compte
          Fic&apos;Tif, cliquez sur le bouton ci-dessous.
        </p>

        {!isChangingPassword ? (
          <button
            className="btn btn-primary text-base-100 hover:btn-secondary"
            onClick={() => setIsChangingPassword(true)}
          >
            Changer le mot de passe
          </button>
        ) : (
          <div className="flex flex-col items-center gap-2 lg:flex-row">
            <input
              type="password"
              placeholder="Nouveau mot de passe"
              className="input input-bordered w-52"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <div className="flex flex-row gap-5">
              <button
                className="btn btn-primary text-base-100 hover:btn-secondary"
                onClick={handleChangePassword}
                disabled={!newPassword}
              >
                Enregistrer
              </button>
              <button
                className="btn btn-primary text-base-100 hover:btn-secondary"
                onClick={() => setIsChangingPassword(false)}
              >
                Annuler
              </button>
            </div>
          </div>
        )}
      </div>

      <dialog id="my_modal_5" className="modal" ref={modalRef}>
        <div className="modal-box">
          <div>
            <h3 className="text-lg font-bold text-error">
              Attention, cette action est irréversible!
            </h3>

            <p className="py-4">
              Êtes vous sûr de vouloir supprimer votre compte Fic&apos;Tif ?
            </p>
          </div>
          <form method="dialog">
            <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="flex flex-row justify-between gap-2">
            <button
              className="btn btn-secondary text-base-100 hover:border-error hover:bg-error"
              onClick={() => handleDeleteAccount()}
            >
              Confirmer
            </button>
            <button
              className="btn btn-primary text-base-100 hover:border-secondary hover:bg-secondary"
              onClick={() => modalRef.current.close()}
            >
              Annuler
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default Settings;
