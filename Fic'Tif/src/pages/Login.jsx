import axios from "axios";
import { PiHouseLineDuotone } from "react-icons/pi";
import { Form, Link, redirect } from "react-router-dom";

export const action = async ({ request }) => {
  const formData = await request.formData();

  const email = formData.get("email");
  const password = formData.get("password");

  console.log(email);
  console.log(password);

  try {
    const { data } = await axios.post(
      "http://localhost:5000/api/v1/auth/login",
      {
        email,
        password,
      },
    );

    console.log(data);
  } catch (error) {
    console.log(error);
  }
  return null;
  // return redirect("/")
};

const Login = () => {
  return (
    <div className="flex h-screen items-center justify-center py-4">
      <Link
        to="/"
        className="btn fixed top-4 animate-bounce cursor-pointer border-primary bg-primary bg-opacity-60 text-4xl text-secondary transition-all duration-500 hover:border-secondary hover:bg-secondary hover:text-primary"
      >
        <PiHouseLineDuotone />
      </Link>
      <div className="flex min-h-[90dvh] w-[90dvw] max-w-5xl flex-col items-center gap-4 rounded-3xl bg-base-100 md:h-72 md:flex-row">
        <div className="flex h-full w-full flex-1 flex-col items-center justify-center rounded-3xl bg-secondary p-4 text-center text-base-100">
          <Form className="flex flex-col gap-4" method="post">
            <h3 className="text-2xl font-semibold">Connection</h3>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-lg">
                Adresse Email
              </label>
              <input
                name="email"
                type="email"
                placeholder="email@example.com"
                className="input input-bordered w-full max-w-xs text-primary"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="text-lg">
                Mot de passe
              </label>
              <input
                name="password"
                type="password"
                placeholder="Votre mot de passe"
                className="input input-bordered w-full max-w-xs text-primary"
              />
            </div>
            <input
              type="submit"
              value="Connectez-vous"
              className="btn btn-primary font-bold text-base-100 hover:border-accent hover:bg-accent"
            />
          </Form>
        </div>
        <div className="flex h-full w-full flex-1 flex-col items-center justify-center gap-8 py-16 text-center text-base-100">
          <h3 className="font-semibold text-primary">
            Vous n&apos;avez pas de compte Fic&apos;Tif ?
          </h3>
          <Link
            to={"/register"}
            className="btn btn-primary text-base-100 hover:border-secondary hover:bg-secondary"
          >
            Créez en un dés maintenant
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Login;
