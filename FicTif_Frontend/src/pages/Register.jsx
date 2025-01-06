import { useEffect, useState, useRef } from "react";
import { PiHouseLineDuotone } from "react-icons/pi";
import { Form, Link, redirect, useFetcher } from "react-router-dom";
import { toast } from "react-toastify";
import ConditionOfUse from "../components/ConditionOfUse.jsx";
import axios from "axios";
const apiClient = axios.create({
  baseURL: import.meta.env.API_BASE_URL,
});

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
  const {
    email,
    password,
    firstname,
    lastname,
    day,
    month,
    year,
    gender,
    address,
    phone,
  } = Object.fromEntries(formData);

  const birthDate = new Date(year, month - 1, day);

  const currentDate = new Date();

  if (birthDate > currentDate) {
    toast.error("La date de naissance ne peut pas être dans le futur.");
    return null;
  }

  try {
    const { data } = await apiClient.post("/api/v1/auth/register/patient", {
      birthDate: `${month}/${day}/${year}`,
      firstName: firstname,
      lastName: lastname,
      address,
      phoneNumber: phone,
      email,
      password,
      gender,
    });

    toast.success(data.msg);

    return redirect("/");
  } catch (error) {
    const errorMessage =
      error.response?.data?.msg || "Erreur lors de la création du compte";
    toast.error(errorMessage);
    return null;
  }
};

const Register = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState({
    gender: "",
    lastname: "",
    firstname: "",
    day: "",
    month: "",
    year: "",
    address: "",
    phone: "",
    email: "",
    password: "",
  });
  const fetcher = useFetcher();
  const modalRef = useRef(null);
  const [isAgreed, setIsAgreed] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const validateCurrentStep = () => {
    if (currentStep === 1) {
      return (
        data.gender &&
        data.lastname &&
        data.firstname &&
        data.day &&
        data.month &&
        data.year
      );
    }
    if (currentStep === 2) {
      return data.address && data.phone;
    }
    if (currentStep === 3) {
      return data.email && data.password;
    }
    return false;
  };

  const nextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    } else {
      toast.error(
        "Veuillez remplir tous les champs avant de passer à la suite",
      );
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  // Change la valeur de "Day" en fonction du mois et de l'année sélectionnés
  useEffect(() => {
    if (data.day && data.month && data.year) {
      const day = parseInt(data.day);
      const month = parseInt(data.month);
      const year = parseInt(data.year);
      const daysInMonth = new Date(year, month, 0).getDate();
      if (day > daysInMonth) {
        setData({ ...data, day: daysInMonth });
      }
    }
  }, [[data.day, data.month, data.year]]);

  const handleSubmit = (event) => {
    event.preventDefault();

    modalRef.current.showModal();
  };

  const confirmSubmission = async () => {
    if (!isAgreed) {
      toast.error(
        "Vous devez accepter les conditions d'utilisation pour poursuivre l'inscription.",
      );
      modalRef.current.close();
      return;
    }

    fetcher.submit(data, {
      method: "post",
      action: "/register",
    });

    modalRef.current.close();
    return redirect("/");
  };

  return (
    <div className="flex h-screen items-center justify-center py-4">
      <Link
        to="/"
        className="btn fixed top-4 animate-bounce cursor-pointer border-primary bg-primary bg-opacity-60 text-4xl text-secondary transition-all duration-500 hover:border-secondary hover:bg-secondary hover:text-primary"
      >
        <PiHouseLineDuotone />
      </Link>
      <div className="flex min-h-[90dvh] w-[90dvw] max-w-5xl flex-col items-center gap-4 rounded-3xl bg-base-100 md:h-72 md:flex-row">
        <div className="flex h-full w-full flex-1 flex-col items-center justify-center gap-1 py-16 text-center text-base-100 md:gap-8">
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
          <Form className="flex w-full flex-col gap-4">
            <div className="flex w-full items-center justify-center gap-2">
              <h3 className="text-2xl font-semibold">Inscription</h3>
              <span className="text-xs italic text-base-300">{`${currentStep}/3`}</span>
            </div>

            {currentStep === 1 && (
              <>
                <div className="flex flex-col gap-4">
                  <h5 className="text-xl font-semibold">Identité</h5>
                  <div className="flex w-full gap-4">
                    <div className="flex flex-1 flex-col">
                      <label htmlFor="gender" className="text-lg">
                        Genre
                      </label>
                      <select
                        name="gender"
                        value={data.gender}
                        onChange={handleChange}
                        className="select select-bordered select-sm w-full max-w-xs text-primary md:select-md"
                        required
                      >
                        <option disabled value="">
                          -- Genre --
                        </option>
                        <option value="man">Homme</option>
                        <option value="woman">Femme</option>
                      </select>
                    </div>
                    <div className="flex flex-1 flex-col">
                      <label htmlFor="lastname" className="text-lg">
                        Nom
                      </label>
                      <input
                        type="text"
                        name="lastname"
                        value={data.lastname}
                        onChange={handleChange}
                        placeholder="Votre nom"
                        className="input input-sm input-bordered w-full max-w-xs text-primary md:input-md"
                        required
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <label htmlFor="firstname" className="text-lg">
                        Prénom
                      </label>
                      <input
                        type="text"
                        name="firstname"
                        value={data.firstname}
                        onChange={handleChange}
                        placeholder="Votre prénom"
                        className="input input-sm input-bordered w-full max-w-xs text-primary md:input-md"
                        required
                      />
                    </div>
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
                        className="select select-bordered select-sm w-full max-w-xs text-primary md:select-md"
                        value={data.day}
                        onChange={handleChange}
                        required
                      >
                        <option disabled value="">
                          -- Jour --
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
                        className="select select-bordered select-sm w-full max-w-xs text-primary md:select-md"
                        value={data.month}
                        onChange={handleChange}
                        required
                      >
                        <option disabled value="">
                          -- Mois --
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
                        className="select select-bordered select-sm w-full max-w-xs text-primary md:select-md"
                        value={data.year}
                        onChange={handleChange}
                        required
                      >
                        <option disabled value="">
                          -- Année --
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
              </>
            )}

            {currentStep === 2 && (
              <div className="flex flex-col gap-4">
                <h5 className="text-xl font-semibold">
                  Informations de contacts
                </h5>
                <div className="flex flex-col">
                  <label htmlFor="address" className="text-lg">
                    Adresse
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={data.address}
                    onChange={handleChange}
                    placeholder="Votre adresse"
                    className="input input-sm input-bordered text-primary md:input-md"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="phone" className="text-lg">
                    Numéro de téléphone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={data.phone}
                    onChange={handleChange}
                    placeholder="Votre numéro de téléphone"
                    className="input input-sm input-bordered text-primary md:input-md"
                    required
                  />
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="flex flex-col gap-4">
                <h5 className="text-xl font-semibold">
                  Informations de connexion
                </h5>
                <div className="flex flex-col">
                  <label htmlFor="email" className="text-lg">
                    Adresse Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    placeholder="email@example.com"
                    className="input input-sm input-bordered w-full text-primary md:input-md"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="password" className="text-lg">
                    Mot de passe
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    placeholder="Votre mot de passe"
                    className="input input-sm input-bordered w-full text-primary md:input-md"
                    required
                  />
                </div>
              </div>
            )}

            <div className="mt-4 flex justify-between gap-4">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="btn btn-accent flex-1"
                >
                  Retour
                </button>
              )}
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="btn btn-primary flex-1"
                >
                  Suivant
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="btn btn-primary flex-1"
                >
                  Inscription
                </button>
              )}
            </div>
          </Form>

          {/* MODALE */}
          <dialog id="my_modal_5" className="modal" ref={modalRef}>
            <div className="modal-box flex flex-col gap-2 text-primary">
              <div className="flex flex-col gap-2">
                <h4 className="text-2xl font-bold text-secondary">
                  Conditions d&apos;utilisation des données
                </h4>
                <p>
                  Veuillez lire et accepter nos conditions d&apos;utilisation
                  concernant la gestion de vos données personnelles conformément
                  au RGPD.
                </p>
                <ConditionOfUse />
              </div>
              <label className="label m-auto w-fit cursor-pointer">
                <input
                  type="checkbox"
                  checked={isAgreed}
                  onChange={() => setIsAgreed(!isAgreed)}
                  className="checkbox"
                />
                <span className="label-text ml-2">
                  J&apos;accepte les conditions d&apos;utilisation.
                </span>
              </label>
              <form method="dialog">
                <button className="btn btn-circle btn-primary btn-sm absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <div>
                <button
                  className="btn btn-secondary mr-2"
                  onClick={() => modalRef.current.close()}
                >
                  Annuler
                </button>
                <button
                  onClick={confirmSubmission}
                  className="btn btn-primary ml-2"
                >
                  Confirmer
                </button>
              </div>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        </div>
      </div>
    </div>
  );
};

export default Register;
