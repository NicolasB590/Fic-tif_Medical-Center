//Gère les prises de rendez-vous.
import moment from "moment";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import MyCalendar from "../components/BigCalendar.jsx";
import WeekdaysView from "../utils/CustomCalendarView.jsx";
import axios from "axios";

const Appointment = () => {
  const [specialities, setSpecialities] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [choiceDoctors, setChoiceDoctors] = useState(false);
  const [appointment, setAppointment] = useState(false);

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

  const getDoctors = async (speciality) => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/doctors/options",
        { params: { speciality } },
      );

      // console.log(data.doctors);
      return data.doctors;
    } catch (error) {
      console.log(error);
    }
  };

  const getUserById = async (id) => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/v1/users`, {
        params: { _id: id },
      });
      return data;
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
    const list = await getDoctors(speciality);
    const idList = list.map((doc) => {
      return doc.user;
    });

    const docsList = idList.map(async (id) => {
      const user = await getUserById(id);
      return user;
    });

    console.log(docsList);

    // setDoctors(TheDoctors);

    setChoiceDoctors(!choiceDoctors);
    if (appointment) {
      setAppointment(!appointment);
    }
  };

  console.log(doctors);
  const changeAppointment = () => {
    setAppointment(!appointment);
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
              onChange={() => changeAppointment(true)}
              defaultValue={""}
            >
              <option value="" disabled>
                -- Choix du médecin --
              </option>
              {doctors.map((doctor) => (
                <option key={doctor.speciality} value={doctor.speciality}>
                  {doctor.speciality}
                </option>
              ))}
              <option>Doc 1</option>
              <option>Doc 2</option>
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
                    events={[
                      {
                        start: new Date(2024, 9, 9, 9, 0, 0),
                        end: new Date(2024, 9, 9, 10, 0, 0),
                      },
                      {
                        start: new Date(2024, 9, 11, 14, 0, 0),
                        end: new Date(2024, 9, 11, 14, 30, 0),
                      },
                    ]}
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
