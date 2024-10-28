import { useEffect, useState } from "react";
import { PiHouseLineDuotone } from "react-icons/pi";
import { Form, Link } from "react-router-dom";

const days = Array.from({ length: 31 }, (_, i) => i + 1);
const months = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];
const years = Array.from(
  { length: 100 },
  (_, i) => new Date().getFullYear() - i,
);

export const action = async ({ request }) => {
  const formData = await request.formData();

  const { email, password, firstname, lastname, day, month, year } = formData;

  console.log(email);
  console.log(password);
  console.log(firstname);
  console.log(lastname);
  console.log(day);
  console.log(month);
  console.log(year);

  return null;
};

const Register = () => {
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const handleDayChange = (e) => {
    setSelectedDay(e.target.value);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  // Change la valeur de "Day" en fonction du mois et de l'année sélectionnés
  useEffect(() => {
    if (selectedDay && selectedMonth && selectedYear) {
      const day = parseInt(selectedDay);
      const month = parseInt(selectedMonth);
      const year = parseInt(selectedYear);

      const daysInMonth = new Date(year, month, 0).getDate();

      if (day > daysInMonth) {
        setSelectedDay(daysInMonth);
      }
    }
  }, [selectedDay, selectedMonth, selectedYear]);

  return (
    <div className="flex h-screen items-center justify-center py-4">
      <Link
        to="/"
        className="btn fixed top-4 animate-bounce cursor-pointer border-primary bg-primary bg-opacity-60 text-4xl text-secondary transition-all duration-500 hover:border-secondary hover:bg-secondary hover:text-primary"
      >
        <PiHouseLineDuotone />
      </Link>
      <div className="flex min-h-[90dvh] w-[90dvw] max-w-5xl flex-col items-center gap-4 rounded-3xl bg-base-100 md:h-72 md:flex-row">
        <div className="flex h-full w-full flex-1 flex-col items-center justify-center gap-8 py-16 text-center text-base-100">
          <h3 className="font-semibold text-primary">
            Vous avez déjà un compte Fic&apos;Tif ?
          </h3>
          <Link
            to="/login"
            className="btn btn-primary text-base-100 hover:border-secondary hover:bg-secondary"
          >
            Connectez vous dés maintenant
          </Link>
        </div>
        <div className="flex h-full w-full flex-1 flex-col items-center justify-center rounded-3xl bg-secondary p-4 text-center text-base-100">
          <Form className="flex flex-col gap-4" method="post">
            <h3 className="text-2xl font-semibold">Inscription</h3>
            <div className="flex gap-4">
              <div className="flex min-w-28 flex-col">
                <label htmlFor="gender" className="text-lg">
                  Identité
                </label>
                <select
                  name="gender"
                  className="select select-bordered w-full max-w-xs text-primary"
                  defaultValue={""}
                  required
                >
                  <option value="" disabled>
                    Genre
                  </option>
                  <option value="man">Homme</option>
                  <option value="woman">Femme</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="lastname" className="text-lg">
                  Nom
                </label>
                <input
                  type="text"
                  name="lastname"
                  placeholder="Votre nom"
                  className="input input-bordered w-full max-w-xs text-primary"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="firstname" className="text-lg">
                  Prénom
                </label>
                <input
                  type="text"
                  name="firstname"
                  placeholder="Votre prénom"
                  className="input input-bordered w-full max-w-xs text-primary"
                  required
                />
              </div>
            </div>
            <div className="flex w-full flex-col">
              <h3 className="text-lg">Date de naissance</h3>
              <div className="flex justify-center gap-4">
                <div className="flex flex-1 flex-col">
                  <label htmlFor="day" className="text-lg">
                    Jour
                  </label>
                  <select
                    name="day"
                    className="select select-bordered w-full max-w-xs text-primary"
                    value={selectedDay}
                    onChange={handleDayChange}
                    required
                  >
                    <option disabled value="">
                      Jour
                    </option>
                    {days.map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-1 flex-col">
                  <label htmlFor="month" className="text-lg">
                    Mois
                  </label>
                  <select
                    name="month"
                    className="select select-bordered w-full max-w-xs text-primary"
                    value={selectedMonth}
                    onChange={handleMonthChange}
                    required
                  >
                    <option disabled value="">
                      Mois
                    </option>
                    {months.map((month, index) => (
                      <option key={index} value={index + 1}>
                        {month}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-1 flex-col">
                  <label htmlFor="year" className="text-lg">
                    Année
                  </label>
                  <select
                    name="year"
                    className="select select-bordered w-full max-w-xs text-primary"
                    value={selectedYear}
                    onChange={handleYearChange}
                    required
                  >
                    <option disabled value="">
                      Année
                    </option>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-1 flex-col">
                <label htmlFor="email" className="text-lg">
                  Adresse Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email@example.com"
                  className="input input-bordered w-full max-w-xs text-primary"
                  required
                />
              </div>
              <div className="flex flex-1 flex-col">
                <label htmlFor="password" className="text-lg">
                  Mot de passe
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Votre mot de passe"
                  className="input input-bordered w-full max-w-xs text-primary"
                  required
                />
              </div>
            </div>
            <input
              type="submit"
              value="Inscription"
              className="btn btn-primary font-bold text-base-100 hover:border-accent hover:bg-accent"
            />
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;
