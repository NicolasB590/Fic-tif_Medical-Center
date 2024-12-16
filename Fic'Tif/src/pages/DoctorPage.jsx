import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/useAuth.jsx";
import { toast } from "react-toastify";
import Loading from "../components/Loading.jsx";

const DoctorPage = () => {
  const [searchParams] = useSearchParams();
  const doctorId = searchParams.get("id");
  const [doctor, setDoctor] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!doctorId) {
      navigate("/");
      return;
    }

    const fetchDoctor = async () => {
      try {
        const response = await axios.post(`/api/v1/doctors/getInformations/`, {
          params: { _id: doctorId },
        });

        const doctorData = response.data.doctor;
        if (doctorData) {
          setDoctor(doctorData);
        } else {
          toast.error("Aucun médecin trouvé pour cet ID.");
          navigate("/");
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des informations du médecin :",
          error,
        );
        toast.error("Erreur lors du chargement des informations du médecin.");
        navigate("/");
      }
    };

    fetchDoctor();
  }, [doctorId, navigate]);

  if (!doctor) {
    return (
      <>
        <Loading />
        <p>Chargement des informations...</p>
      </>
    );
  }

  return (
    <div className="mx-auto p-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <img
          src={doctor.user?.avatar || "/user-circle-duotone.svg"}
          alt={`Avatar de ${doctor.user?.firstName} ${doctor.user?.lastName}`}
          className="h-24 w-24 self-center rounded-full"
        />
        <div>
          <h2 className="text-2xl font-bold text-base-content">{`Dr. ${doctor.user?.firstName} ${doctor.user?.lastName}`}</h2>
          <p className="text-xl text-primary">
            {doctor.speciality || "Généraliste"}
          </p>
        </div>
      </div>

      <div className="divider" />

      {/* Détails */}
      <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="rounded-lg bg-base-300 p-4 shadow-lg">
          <h3 className="mb-2 text-lg font-semibold text-primary">Contact</h3>
          <p>
            <span className="font-medium text-secondary">Email :</span>{" "}
            {doctor.user?.email || "Non renseigné"}
          </p>
          <p>
            <span className="font-medium text-secondary">Téléphone :</span>{" "}
            {doctor.user?.phoneNumber || "Non renseigné"}
          </p>
        </div>
        <div className="rounded-lg bg-base-300 p-4 shadow-lg">
          <h3 className="mb-2 text-lg font-semibold text-primary">
            Informations supplémentaires
          </h3>
          <p>
            <span className="font-medium text-secondary">Adresse :</span>{" "}
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
              pathname: "/appointment",
              search: `?id=${doctor.user?.doctor}`,
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
