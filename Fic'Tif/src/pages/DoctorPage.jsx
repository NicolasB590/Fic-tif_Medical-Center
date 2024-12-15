import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/useAuth.jsx";
import { toast } from "react-toastify"; // Import du toast

const DoctorPage = () => {
  const [searchParams] = useSearchParams();
  const doctorId = searchParams.get("id"); // Récupère l'ID du médecin depuis l'URL
  const [doctor, setDoctor] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate(); // Pour gérer les redirections

  // Récupération des données du médecin via l'API
  useEffect(() => {
    if (!doctorId) {
      // Si aucun ID n'est trouvé dans l'URL, redirige immédiatement vers la page d'accueil
      navigate("/");
      return;
    }

    const fetchDoctor = async () => {
      try {
        const response = await axios.post(`/api/v1/doctors/getInformations/`, {
          params: { _id: doctorId },
        });

        console.log(`réponse : ${JSON.stringify(response)}`);

        // Vérifie et extrait le médecin si les données sont présentes
        const doctorData = response.data.doctor;
        console.log(`doctorData : ${JSON.stringify(doctorData, null, 2)}`);
        if (doctorData) {
          setDoctor(doctorData);
        } else {
          // Redirection et affichage du toast si aucun médecin n'est trouvé
          toast.error("Aucun médecin trouvé pour cet ID.");
          navigate("/");
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des informations du médecin :",
          error,
        );
        // Redirection et affichage du toast en cas d'erreur
        toast.error("Erreur lors du chargement des informations du médecin.");
        navigate("/");
      }
    };

    fetchDoctor();
  }, [doctorId, navigate]);

  if (!doctor) {
    return <p>Chargement des informations...</p>;
  }

  return (
    <div className="mx-auto p-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <img
          src={doctor.user?.avatar || "/default-avatar.png"} // Fallback si pas d'avatar
          alt={`Avatar of ${doctor.user?.firstName} ${doctor.user?.lastName}`}
          className="h-24 w-24 self-center rounded-full"
        />
        <div>
          <h1 className="text-2xl font-bold">{`Dr. ${doctor.user?.firstName} ${doctor.user?.lastName}`}</h1>
          <p className="text-gray-600">{doctor.speciality || "Généraliste"}</p>
        </div>
      </div>

      <div className="divider" />

      {/* Détails */}
      <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="rounded-lg bg-white p-4 shadow-lg">
          <h2 className="mb-2 text-lg font-semibold">Contact</h2>
          <p className="text-gray-700">
            <span className="font-medium">Email :</span>{" "}
            {doctor.user?.email || "Non renseigné"}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Téléphone :</span>{" "}
            {doctor.user?.phoneNumber || "Non renseigné"}
          </p>
        </div>
        <div className="rounded-lg bg-white p-4 shadow-lg">
          <h2 className="mb-2 text-lg font-semibold">
            Informations supplémentaires
          </h2>
          <p className="text-gray-700">
            <span className="font-medium">Adresse :</span>{" "}
            {doctor.user?.address || "Non renseignée"}
          </p>
        </div>
      </div>

      {/* Bouton de prise de rendez-vous */}
      {user?.role === "doctor" || !user ? (
        ""
      ) : (
        <div className="text-center">
          <Link
            to={{
              pathname: "/appointments",
              search: `?id=${doctor.doctor}`, // Passe l'ID du médecin pour préremplir le formulaire
            }}
          >
            <button className="btn btn-primary px-6 py-3 text-lg font-semibold">
              Prendre un rendez-vous
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default DoctorPage;
