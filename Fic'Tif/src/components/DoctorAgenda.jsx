import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { format, startOfWeek, addDays, parseISO, isSameWeek } from "date-fns";

// Fonction pour formater les dates au format JJ/MM/AAAA
const formatDate = (date) => {
  return format(date, "dd/MM/yyyy");
};

// Fonction pour formater l'heure des rendez-vous au format HH:mm
const formatTime = (date) => {
  return format(date, "HH:mm");
};

// Fonction pour grouper les rendez-vous par jour
const groupAppointmentsByDay = (appointments) => {
  return appointments.reduce((grouped, appointment) => {
    const day = format(parseISO(appointment.date), "yyyy-MM-dd");
    if (!grouped[day]) {
      grouped[day] = [];
    }
    grouped[day].push(appointment);
    return grouped;
  }, {});
};

// Fonction pour diviser les rendez-vous en semaines
const groupAppointmentsByWeek = (appointments) => {
  const weeks = [];
  let currentWeek = [];
  let currentStartOfWeek = startOfWeek(new Date());

  for (let appointment of appointments) {
    const appointmentDate = parseISO(appointment.date);
    if (!isSameWeek(appointmentDate, currentStartOfWeek)) {
      // Si on change de semaine, push la semaine actuelle dans le tableau
      weeks.push(currentWeek);
      currentWeek = [];
      currentStartOfWeek = startOfWeek(appointmentDate);
    }
    currentWeek.push(appointment);
  }

  if (currentWeek.length) {
    weeks.push(currentWeek); // Ajoute la dernière semaine
  }

  return weeks;
};

const getAppointments = async () => {
  try {
    const response = await axios.post("/api/v1/appointments/user");
    console.log(response.data.appointments); // Vérifier la structure des données
    return Array.isArray(response.data.appointments)
      ? response.data.appointments
      : []; // S'assurer que c'est un tableau
  } catch (error) {
    console.log(error);
    toast.error(
      "Une erreur est survenue lors de la récupération des rendez-vous.",
    );
    return []; // En cas d'erreur, retourner un tableau vide
  }
};

const DoctorAgenda = () => {
  const [appointments, setAppointments] = useState(null);
  const [currentWeekIndex, setCurrentWeekIndex] = useState(1);

  useEffect(() => {
    const fetchAppointments = async () => {
      const fetchedAppointments = await getAppointments();
      setAppointments(fetchedAppointments);

      // Calculer l'index de la semaine actuelle
      const weeklyAppointments = groupAppointmentsByWeek(fetchedAppointments);
      const today = new Date();
      const currentWeekStart = startOfWeek(today, { weekStartsOn: 1 });

      const currentIndex = weeklyAppointments.findIndex((week) => {
        const weekStart = startOfWeek(parseISO(week[0].date), {
          weekStartsOn: 1,
        });
        return isSameWeek(currentWeekStart, weekStart);
      });

      // Si la semaine en cours est trouvée, l'utiliser, sinon mettre à 0
      setCurrentWeekIndex(currentIndex !== -1 ? currentIndex : 0);
    };
    fetchAppointments();
  }, []);

  if (appointments === null) {
    return <div>Chargement des rendez-vous...</div>;
  }

  // Grouper les rendez-vous par semaine
  const weeklyAppointments = groupAppointmentsByWeek(appointments);

  // Obtenir les rendez-vous de la semaine actuelle
  const currentWeekAppointments = weeklyAppointments[currentWeekIndex] || [];

  // Calcul des dates de début et de fin de la semaine
  const startOfCurrentWeek = startOfWeek(new Date(), { weekStartsOn: 1 }); // Commence la semaine le lundi
  const endOfCurrentWeek = addDays(startOfCurrentWeek, 6); // La fin de la semaine est 6 jours après le début

  return (
    <div>
      <h2 className="mb-4 text-center text-3xl font-semibold text-primary">
        Agenda
      </h2>

      {/* Pagination : semaine précédente / semaine suivante */}
      <div className="lg: flex flex-col items-center justify-center gap-4 lg:flex-row">
        <button
          onClick={() => setCurrentWeekIndex(Math.max(currentWeekIndex - 1, 0))}
          disabled={currentWeekIndex === 1}
          className="btn btn-primary w-full text-xs transition-all duration-500 hover:btn-secondary lg:w-48 lg:text-sm"
        >
          Semaine précédente
        </button>
        <div className="text-center font-semibold text-primary">
          <p>
            Semaine du :{" "}
            <span className="font-bold text-secondary">
              {currentWeekAppointments.length > 0 &&
                (() => {
                  const firstAppointmentDate = parseISO(
                    currentWeekAppointments[0].date,
                  );
                  const startOfWeekDisplayed = startOfWeek(
                    firstAppointmentDate,
                    {
                      weekStartsOn: 1,
                    },
                  );
                  const endOfWeekDisplayed = addDays(startOfWeekDisplayed, 6);

                  return `${formatDate(startOfWeekDisplayed)} - ${formatDate(endOfWeekDisplayed)}`;
                })()}
            </span>
          </p>
        </div>
        <button
          onClick={() =>
            setCurrentWeekIndex(
              Math.min(currentWeekIndex + 1, weeklyAppointments.length - 1),
            )
          }
          disabled={currentWeekIndex === weeklyAppointments.length - 1}
          className="btn btn-primary w-full text-xs transition-all duration-500 hover:btn-secondary lg:w-48 lg:text-sm"
        >
          Semaine suivante
        </button>
      </div>

      {/* Afficher les rendez-vous pour chaque jour */}
      {currentWeekAppointments.length === 0 ? (
        <div className="divider">Aucun rendez-vous pour cette semaine</div>
      ) : (
        <div className="grid-row-5 grid max-h-[calc(100vh-322px)] gap-4 overflow-y-auto lg:grid-cols-5">
          {Object.keys(groupAppointmentsByDay(currentWeekAppointments)).map(
            (day, index) => {
              const dailyAppointments = groupAppointmentsByDay(
                currentWeekAppointments,
              )[day];

              return (
                <div key={index}>
                  <div className="divider w-full lg:w-44">
                    <h3 className="text-xl font-semibold text-primary">
                      {formatDate(new Date(day))}
                    </h3>
                  </div>

                  <ul className="flex flex-col gap-4">
                    {dailyAppointments.map((appointment, idx) => (
                      <li
                        key={idx}
                        className="btn flex w-full flex-col lg:w-44"
                      >
                        <p>
                          Consultation :
                          <span className="text-secondary">
                            {formatTime(parseISO(appointment.date))}
                          </span>
                        </p>
                        <p>
                          Statut :{" "}
                          <span className="text-secondary">
                            {appointment.status}
                          </span>
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            },
          )}
        </div>
      )}
    </div>
  );
};

export default DoctorAgenda;
