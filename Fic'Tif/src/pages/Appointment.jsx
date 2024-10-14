//Gère les prises de rendez-vous.
import moment from "moment";
import { useState } from "react";
import { useForm } from "react-hook-form";
import MyCalendar from "../components/BigCalendar.jsx";
import WeekdaysView from "../utils/CustomCalendarView.jsx";

const Appointment = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [choiceDoctors, setChoiceDoctors] = useState(false);
  const [infos, setInfos] = useState(false);

  const changeDoctors = (newValue) => {
    setChoiceDoctors(newValue);
    setInfos(!newValue);
  };

  const changeInfos = (newValue) => {
    setInfos(newValue);
  };

  const onSubmit = (data) => console.log(data);

  return (
    <div
      className={`mb-4 rounded-box bg-base-200 p-4 py-8 text-primary ${
        infos === true ? "w-full min-w-96" : ""
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
          onChange={() => changeDoctors(true)}
          className="select select-bordered mb-4 mt-2 w-full"
          defaultValue={""}
        >
          <option disabled value="">
            -- Choix de la consultation --
          </option>
          <option value={"eee"}>Ophtalmologie</option>
          <option value={"eee"}>Cardiologie</option>
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
              className="select select-bordered mb-4 mt-2 w-full"
              onChange={() => changeInfos(true)}
              defaultValue={""}
            >
              <option value="" disabled>
                -- Choix du médecin --
              </option>
              <option>Doc 1</option>
              <option>Doc 2</option>
            </select>

            {infos === true ? (
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
                  {/* <Calendar
                    localizer={localizer}
                    events={[
                      {
                        title: "coin",
                        start: new Date(2024, 9, 9, 9, 0, 0),
                        end: new Date(2024, 9, 9, 10, 0, 0),
                      },
                      {
                        title: "coin",
                        start: new Date(2024, 9, 11, 14, 0, 0),
                        end: new Date(2024, 9, 11, 14, 30, 0),
                      },
                    ]}
                    defaultView={Views.WEEK}
                    showMultiDayTimes
                    startAccessor="start"
                    endAccessor="end"
                    step={30}
                    style={{ height: 500 }}
                    min={new Date(2024, 0, 1, 9, 0)}
                    max={new Date(2024, 0, 1, 18, 0)}
                  /> */}
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
