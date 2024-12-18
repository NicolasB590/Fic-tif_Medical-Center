import { NavLink } from "react-router-dom";
import { useAuth } from "../context/useAuth.jsx";

const Hero = () => {
  const { user } = useAuth();

  return (
    <div
      className="hero flex-1 rounded-box"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1596541223130-5d31a73fb6c6?q=80&w=2342&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
      }}
    >
      <div className="hero-overlay bg-base-100 bg-opacity-80"></div>
      <div className="hero-content text-center text-base-content">
        <div className="max-w-md">
          {user ? (
            <>
              <h2 className="mb-5 text-5xl font-bold">{`Bonjour ${user.firstName}`}</h2>
              <p className="mb-5 font-semibold">
                Un besoin médical ? Prenez rendez-vous dès aujourd&apos;hui pour
                bénéficier des soins adaptés à vos besoins.
              </p>
              <NavLink to="/appointment">
                <button className="btn btn-primary text-base-100 transition-all duration-500 hover:btn-secondary">
                  Prendre rendez-vous
                </button>
              </NavLink>
            </>
          ) : (
            <>
              <h2 className="mb-5 text-5xl font-bold">{`Bonjour`}</h2>
              <p className="mb-5 font-semibold">
                Que ce soit pour un petit bobo, une consultation de routine, ou
                pour un suivi médical important, notre équipe de professionnels
                est là pour vous accompagner. Si vous ou l&apos;un de vos
                proches traversez un moment difficile, n&apos;attendez pas :
                nous sommes prêts à vous recevoir rapidement dans un
                environnement chaleureux et rassurant. Faites le premier pas
                vers un mieux-être, inscivez vous dès aujourd&apos;hui pour
                prendre rendez-vous avec l&apos;un de nos spécialistes.
              </p>
              <div className="flex flex-row justify-center gap-4">
                <NavLink to="/register">
                  <button className="btn btn-primary text-base-100 transition-all duration-500 hover:btn-secondary">
                    Inscription
                    <span className="animate-bounce font-bold">!!</span>
                  </button>
                </NavLink>
                <NavLink to="/login">
                  <button className="btn btn-primary text-base-100 transition-all duration-500 hover:btn-secondary">
                    Connection
                  </button>
                </NavLink>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default Hero;
