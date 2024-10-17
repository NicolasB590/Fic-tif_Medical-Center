import moment from "moment-timezone";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import MyCalendar from "../components/BigCalendar.jsx";
import WeekdaysView from "../utils/CustomCalendarView.jsx";
import generateReservationSlots from "../utils/generateReservationSlots.js";
import axios from "axios";

const Appointment2 = () => {
  const [specialities, setSpecialities] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [choiceDoctors, setChoiceDoctors] = useState(false);
  const [appointment, setAppointment] = useState(false);
  const [slots, setSlots] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null); // État pour l'événement sélectionné
  const [isModalOpen, setIsModalOpen] = useState(false); // État pour la modale

  const allSlots = generateReservationSlots();

  const getAllSpecialities = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/doctors/specialities",
      );
      setSpecialities(data.specialities);
    } catch (error) {
      console.log(error);
    }
  };

  const getDoctorsBySpeciality = async (speciality) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/doctors/bySpeciality",
        { speciality },
      );
      return data.doctors;
    } catch (error) {
      console.log(error);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const changeDoctors = async (speciality) => {
    const list = await getDoctorsBySpeciality(speciality);
    const docList = list.map((doc) => ({
      lastName: doc.user.lastName,
      firstName: doc.user.firstName,
      id: doc._id,
    }));

    setDoctors(docList);
    setChoiceDoctors(true);
    setAppointment(false);
  };

  const getReservedSlots = async (doctorId) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/appointments/bydoctors",
        { doctorId },
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const changeAppointment = async (doctorId) => {
    try {
      const reservedSlots = await getReservedSlots(doctorId);
      const reservedAppointments = reservedSlots.appointments;

      const availableSlots = allSlots.filter((slot) => {
        const slotStart = moment(slot.start).tz("Europe/Paris");
        const slotEnd = slotStart.clone().add(30, "minutes");

        return !reservedAppointments.some((appointment) => {
          const appointmentStart = moment(appointment.date).tz("Europe/Paris");
          const appointmentEnd = appointmentStart.clone().add(30, "minutes");

          return (
            slotStart.isBefore(appointmentEnd) &&
            slotEnd.isAfter(appointmentStart)
          );
        });
      });

      setSlots(availableSlots);
      setAppointment(true);
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event); // Stocke l'événement cliqué
    setIsModalOpen(true); // Ouvre la modale
  };

  const onSubmit = (data) => {
    console.log(data);
    // Ajouter la logique de soumission du formulaire ici
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null); // Réinitialise l'événement sélectionné
  };

  useEffect(() => {
    getAllSpecialities();
  }, []);

  return (
    <div
      className={`mb-4 rounded-box bg-base-200 p-4 py-8 text-primary ${appointment ? "w-full min-w-96" : ""}`}
    >
      <h1 className="mb-8 text-center text-2xl font-bold">
        Prendre un rendez-vous
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label
          htmlFor="name"
          className="my-4 text-center text-xl font-semibold"
        >
          <h2>Type de consultation</h2>
        </label>
        <select
          name="consultation"
          onChange={(event) => changeDoctors(event.target.value)}
          className="select select-bordered mb-4 mt-2 w-full transition-all hover:text-secondary"
          defaultValue=""
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

        {choiceDoctors && (
          <>
            <label
              htmlFor="docs"
              className="my-4 text-center text-xl font-semibold"
            >
              <h2>Choisissez votre médecin</h2>
            </label>
            <select
              name="docs"
              className="select select-bordered mb-4 mt-2 w-full transition-all hover:text-secondary"
              onChange={(event) => changeAppointment(event.target.value)}
              defaultValue=""
            >
              <option value="" disabled>
                -- Choix du médecin --
              </option>
              {doctors.map((doc) => (
                <option
                  key={doc.id}
                  value={doc.id}
                >{`Dr. ${doc.lastName} ${doc.firstName}`}</option>
              ))}
            </select>

            {appointment && (
              <>
                <h2 className="m-4 text-center text-xl font-semibold">
                  Choisissez un horaire
                </h2>
                <div>
                  <MyCalendar
                    defaultView={"weekdays"}
                    views={{ weekdays: WeekdaysView }}
                    toolbar={true}
                    max={moment("2023-03-18T18:00:00").toDate()}
                    min={moment("2023-03-18T08:00:00").toDate()}
                    events={slots}
                    onSelectEvent={handleEventClick} // Gère le clic sur l'événement
                  />
                </div>
                {errors.exampleRequired && <span>This field is required</span>}
                <input
                  type="submit"
                  className="btn btn-primary btn-block my-4 text-base-100"
                />
              </>
            )}
          </>
        )}
      </form>

      {/* Modale pour le formulaire */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Détails de l'événement"
      >
        {selectedEvent && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label>Titre :</label>
              <input
                type="text"
                defaultValue={selectedEvent.title}
                {...register("title", { required: true })}
                className="input input-bordered w-full"
              />
              {errors.title && <span>This field is required</span>}
            </div>
            <div>
              <label>Description :</label>
              <textarea
                {...register("description", { required: true })}
                className="textarea textarea-bordered w-full"
              />
              {errors.description && <span>This field is required</span>}
            </div>
            <div className="modal-action">
              <button type="submit" className="btn">
                Valider
              </button>
              <button type="button" className="btn" onClick={handleCloseModal}>
                Annuler
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default Appointment2;
