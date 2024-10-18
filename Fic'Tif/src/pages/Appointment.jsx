//Gère les prises de rendez-vous.
import moment from "moment-timezone";
import { useEffect, useState } from "react";
import MyCalendar from "../components/BigCalendar.jsx";
import WeekdaysView from "../utils/CustomCalendarView.jsx";
import generateReservationSlots from "../utils/generateReservationSlots.js";
import axios from "axios";
import { useRef } from "react";
import { useFetcher } from "react-router-dom";

const Appointment = () => {
  const [specialities, setSpecialities] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [choiceDoctors, setChoiceDoctors] = useState(false);
  const [appointment, setAppointment] = useState(false);
  const [slots, setSlots] = useState([]);
  const [formData, setFormData] = useState({
    doctor: null,
    reservedDate: null,
  });
  const [currentDoctor, setCurrentDoctor] = useState(null);
  const modalRef = useRef(null);

  // const fetcher = useFetcher();

  // if (fetcher.formData) {
  //   for (const data of fetcher.formData.entries()) {
  //     console.log(JSON.stringify(data));
  //   }
  // }

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

  const submitForm = async () => {
    event.preventDefault();
    console.log("coin");

    if (!formData.doctor || !formData.reservedDate) {
      console.error("Docteur ou date de rendez-vous non sélectionné.");
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/appointments",
        {
          date: formData.reservedDate,
          doctorId: formData.doctor,
          patientId: "6707d96b65816cd4c6b4dd38",
        },
      );

      console.log("Rendez-vous confirmé :", data);

      if (modalRef.current) {
        modalRef.current.close();
      }
    } catch (error) {
      console.log(error);
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
    const updatedData = {
      doctor: doctorId,
      reservedDate: null,
    };

    setFormData(updatedData);

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
    const updatedData = { doctor: formData.doctor, reservedDate: event.start };

    setFormData(updatedData);

    console.log(updatedData);

    if (modalRef.current) {
      modalRef.current.showModal();
    }

    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/doctors/options",
        { params: { _id: updatedData.doctor } },
      );

      console.log(data);

      setCurrentDoctor(data.doctors);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllSpecialities();
  }, []);

  return (
    <div
      className={`mb-4 rounded-box bg-base-200 p-4 py-8 text-primary ${
        appointment === true ? "w-full min-w-96" : ""
      }`}
    >
      <h1 className="mb-8 text-center text-2xl font-bold">
        Prendre un rendez-vous
      </h1>
      <form>
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
              htmlFor="docs"
              className="my-4 text-center text-xl font-semibold"
            >
              <h2>Choissisez votre médecin</h2>
            </label>
            <select
              name="docs"
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
                <h2 className="m-4 text-center text-xl font-semibold">
                  Choissisez un horaire
                </h2>
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
                <input
                  type="submit"
                  className="btn btn-primary btn-block my-4 text-base-100"
                />
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
                <h4>
                  {`Dr. ${currentDoctor[0].user.lastName} ${currentDoctor[0].user.firstName}`}
                </h4>
                <h5>{`Spécialité : ${currentDoctor[0].speciality}`}</h5>
                <p>{`Numéro de téléphone : ${currentDoctor[0].user.phoneNumber}`}</p>
                <p>{`Email : ${currentDoctor[0].user.email}`}</p>
              </div>
            )}
            <p className="py-4">Informations du Patient</p>
            <p className="py-4">
              {formData.reservedDate
                ? `Date du Rendez-vous : ${moment(formData.reservedDate).format(
                    "dddd DD MMMM YYYY hh:mm",
                  )}`
                : "Date non sélectionnée"}
            </p>
          </div>
          <div>
            <form method="dialog">
              <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
                ✕
              </button>
            </form>
            <form action={submitForm}>
              <input type="submit" value="Confirmer" className="btn" />
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
