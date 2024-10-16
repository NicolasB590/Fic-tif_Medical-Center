//Gère les prises de rendez-vous.
import moment from "moment";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import MyCalendar from "../components/BigCalendar.jsx";
import WeekdaysView from "../utils/CustomCalendarView.jsx";
import generateReservationSlots from "../utils/generateReservationSlots.js";
import axios from "axios";

const Appointment = () => {
  const [specialities, setSpecialities] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [choiceDoctors, setChoiceDoctors] = useState(false);
  const [appointment, setAppointment] = useState(false);
  const [slots, setSlots] = useState([]);

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
    watch,
    formState: { errors },
  } = useForm();

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
    console.log(doctorId);

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/appointments/bydoctors",
        { doctorId },
      );

      const newData = data.appointments.map((d) => {
        // const options = {
        //   timeZone: "Europe/Paris",
        //   year: "numeric",
        //   month: "2-digit",
        //   day: "2-digit",
        //   hour: "2-digit",
        //   minute: "2-digit",
        //   hour12: false, // Format 24h
        // };

        d.date = new Date(d.date).toLocaleString("fr-FR");
        return d;
      });

      return newData;
    } catch (error) {
      console.log(error);
    }
  };

  const changeAppointment = async (doctorId) => {
    const reservedSlots = await getReservedSlots(doctorId);
    console.log(reservedSlots);

    console.log(allSlots);

    // const availableSlots = allSlots.filter((slot) => {
    //   return slot.start.getHours() !==

    // })

    const availableSlots = allSlots.filter((slot) => {
      const slotStart = moment(slot.start).toLocaleString("fr-FR");
      console.log(slotStart);

      // console.log(slotStart._d.getHours());
      // console.log(slotStart._d.getMinutes());

      const slotEnd = moment(slot.end).toLocaleString("fr-FR");

      const filteredSlots = !reservedSlots.some((appointment) => {
        const appointmentDate = moment(appointment.date);

        const appointmentStart = appointmentDate.startOf("hour");
        console.log(appointmentStart);

        const appointmentEnd = appointmentDate.endOf("hour");

        return (
          (slotStart >= appointmentStart && slotStart < appointmentEnd) ||
          (slotEnd > appointmentStart && slotEnd <= appointmentEnd)
        );
      });

      return filteredSlots;
    });

    setSlots(availableSlots);

    if (!appointment) {
      setAppointment(!appointment);
    }
  };

  const onSubmit = (data) => console.log(data);

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
      {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
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
                    events={allSlots}
                  />
                </div>
                {errors.exampleRequired && <span>This field is required</span>}
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
    </div>
  );
};
export default Appointment;
