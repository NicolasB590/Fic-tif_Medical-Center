//Gère les prises de rendez-vous.
import moment from "moment-timezone";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
const apiClient = axios.create({
  baseURL: import.meta.env.API_BASE_URL,
});
import { useFetcher, redirect, useNavigate } from "react-router-dom";

import MyCalendar from "../components/BigCalendar.jsx";
import WeekdaysView from "../utils/CustomCalendarView.jsx";
import generateReservationSlots from "../utils/functions/generateReservationSlots.js";
import { toast } from "react-toastify";
import { useAuth } from "../context/useAuth.jsx";

// eslint-disable-next-line react-refresh/only-export-components
export const action = async ({ request }) => {
  const formData = await request.formData();
  const doctor = formData.get("doctor");
  const reservedDate = formData.get("reservedDate");
  const patient = formData.get("patient");

  if (!doctor || !reservedDate) {
    throw new Error("Docteur ou date de rendez-vous non sélectionné.");
  }

  try {
    const { data } = await apiClient.post("/api/v1/appointments", {
      date: reservedDate,
      doctorId: doctor,
      patientId: patient,
    });

    toast.success(data.msg);

    return redirect("/");
  } catch (error) {
    const errorMessage =
      error.response?.data?.msg || "Erreur lors de la prise de rendez-vous";
    toast.error(errorMessage);
    return null;
  }
};

const Appointment = () => {
  const [specialities, setSpecialities] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [choiceDoctors, setChoiceDoctors] = useState(false);
  const [appointment, setAppointment] = useState(false);
  const [slots, setSlots] = useState([]);
  const [appointmentValues, setAppointmentValues] = useState({
    doctor: null,
    reservedDate: null,
  });
  const [currentDoctor, setCurrentDoctor] = useState(null);
  const modalRef = useRef(null);
  const formRef = useRef();
  const fetcher = useFetcher();
  const allSlots = generateReservationSlots();
  const { user } = useAuth();
  const navigate = useNavigate();

  const getAllSpecialities = async () => {
    try {
      const { data } = await apiClient.get("/api/v1/doctors/specialities");
      setSpecialities(data.specialities);
    } catch (error) {
      const errorMessage =
        error.response?.data?.msg ||
        "Erreur lors de la récupération des types de consultation";
      toast.error(errorMessage);
    }
  };

  const getDoctorsBySpeciality = async (speciality) => {
    try {
      const { data } = await apiClient.post("/api/v1/doctors/bySpeciality", {
        speciality,
      });
      return data.doctors;
    } catch (error) {
      const errorMessage =
        error.response?.data?.msg ||
        "Erreur lors de la récupération des médecins";
      toast.error(errorMessage);
    }
  };

  const submitForm = async (event) => {
    event.preventDefault();
    fetcher.submit(appointmentValues, {
      method: "post",
      action: "/appointment",
    });

    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  const changeDoctors = async (speciality) => {
    const list = await getDoctorsBySpeciality(speciality);

    const docList = list.map((doc) => {
      return {
        lastName: doc.user.lastName,
        firstName: doc.user.firstName,
        id: doc._id,
      };
    });

    setDoctors(docList);

    if (!choiceDoctors) {
      setChoiceDoctors(!choiceDoctors);
    }
    if (appointment) {
      setAppointment(!appointment);
    }
  };

  const getReservedSlots = async (doctorId) => {
    try {
      const { data } = await apiClient.post("/api/v1/appointments/doctors", {
        doctorId,
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const changeAppointment = async (doctorId) => {
    const updatedData = {
      doctor: doctorId,
      reservedDate: null,
    };

    setAppointmentValues(updatedData);

    try {
      const reservedSlots = await getReservedSlots(doctorId);
      const reservedAppointments = reservedSlots.appointments;

      // Récupération des créneaux disponibles
      const availableSlots = allSlots.filter((slot) => {
        const slotStart = moment(slot.start).tz("Europe/Paris");
        const slotEnd = slotStart.clone().add(30, "minutes");

        const isAvailable = !reservedAppointments.some((appointment) => {
          const appointmentStart = moment(appointment.date)
            .tz("Europe/Paris")
            .add(1, "seconds");
          const appointmentEnd = moment(appointmentStart).add(29, "minutes");

          return (
            slotStart.isBefore(appointmentEnd) &&
            slotEnd.isAfter(appointmentStart)
          );
        });

        return isAvailable;
      });

      setSlots(availableSlots);

      if (!appointment) {
        setAppointment(!appointment);
      }
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  const handleEventClick = async (event) => {
    const updatedValues = {
      doctor: appointmentValues.doctor,
      reservedDate: event.start,
      patient: user._id,
    };

    setAppointmentValues(updatedValues);

    if (modalRef.current) {
      modalRef.current.showModal();
    }

    try {
      const { data } = await apiClient.post("/api/v1/doctors/options", {
        _id: updatedValues.doctor,
      });

      setCurrentDoctor(data.doctors);
    } catch (error) {
      const errorMessage =
        error.response?.data?.msg ||
        "Erreur lors de la récupération des informations du médecin";
      toast.error(errorMessage);
    }
  };

  if (user) {
    if (user.role === "doctor") {
      navigate("/");
    }
  }

  useEffect(() => {
    getAllSpecialities();
  }, []);

  return (
    <div
      className={`mb-4 rounded-box bg-base-200 p-4 py-8 text-primary ${
        appointment === true ? "w-full min-w-96" : ""
      }`}
    >
      <h2 className="mb-8 text-center text-2xl font-bold">
        Prendre un rendez-vous
      </h2>
      <form ref={formRef}>
        <label
          htmlFor="speciality"
          className="my-4 text-center text-xl font-semibold"
        >
          Type de consultation
        </label>
        <select
          name="speciality"
          onChange={(event) => changeDoctors(event.target.value)}
          className="select select-bordered mb-4 mt-2 w-full transition-all hover:text-secondary"
          defaultValue={""}
        >
          <option disabled value="">
            -- Choix de la consultation --
          </option>
          {specialities.map((speciality) => (
            <option key={speciality} value={speciality}>
              {speciality}
            </option>
          ))}
        </select>
        {choiceDoctors === true ? (
          <>
            <label
              htmlFor="doctor"
              className="my-4 text-center text-xl font-semibold"
            >
              Choissisez votre médecin
            </label>
            <select
              name="doctor"
              className="select select-bordered mb-4 mt-2 w-full transition-all hover:text-secondary"
              onChange={(event) => changeAppointment(event.target.value)}
              defaultValue={""}
            >
              <option value="" disabled>
                -- Choix du médecin --
              </option>
              {doctors.map((doc) => (
                <option key={doc.id} value={doc.id}>
                  {`Dr. ${doc.lastName} ${doc.firstName}`}
                </option>
              ))}
            </select>

            {appointment === true ? (
              <>
                <h3 className="m-4 text-center text-xl font-semibold">
                  Choissisez un horaire
                </h3>
                <div>
                  <MyCalendar
                    defaultView={"weekdays"}
                    views={{ weekdays: WeekdaysView }}
                    toolbar={true}
                    max={moment("2023-03-18T18:00:00").toDate()}
                    min={moment("2023-03-18T08:00:00").toDate()}
                    events={slots}
                    onSelectEvent={handleEventClick}
                  />
                </div>
              </>
            ) : (
              ""
            )}
          </>
        ) : (
          ""
        )}
      </form>
      <dialog id="my_modal_5" className="modal" ref={modalRef}>
        <div className="modal-box">
          <div>
            <h3 className="text-lg font-bold">Confirmation de rendez-vous :</h3>
            {currentDoctor && currentDoctor.length > 0 && (
              <div>
                <p>
                  {`Avec le Dr. ${currentDoctor[0].user.lastName} ${currentDoctor[0].user.firstName}`}
                </p>
                <p>{`Spécialité : ${currentDoctor[0].speciality}`}</p>
                <p>{`Numéro de téléphone : ${currentDoctor[0].user.phoneNumber}`}</p>
                <p>{`Email : ${currentDoctor[0].user.email}`}</p>
              </div>
            )}
            {user ? (
              <div className="py-4">
                <p>{`Pour ${user.gender === "woman" ? "la" : "le"} patient${user.gender === "woman" ? "e" : ""} ${user.lastName} ${user.firstName}`}</p>
                <p>{`Numéro de téléphone : ${user.phoneNumber}`}</p>
                <p>{`Email : ${user.email}`}</p>
              </div>
            ) : (
              ""
            )}

            <p className="pb-4">
              {appointmentValues.reservedDate
                ? `Date du Rendez-vous : ${moment(
                    appointmentValues.reservedDate,
                  ).format("dddd DD MMMM YYYY hh:mm")}`
                : "Date non sélectionnée"}
            </p>
          </div>
          <div>
            <form method="dialog">
              <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
                ✕
              </button>
            </form>
            <form onSubmit={() => submitForm(event)}>
              <input
                type="submit"
                value="Confirmer"
                className="btn btn-primary text-base-100 hover:border-secondary hover:bg-secondary"
              />
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};
export default Appointment;
