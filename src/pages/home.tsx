import { useState } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useNavigate } from "react-router-dom";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { toast } from "sonner";
import { LuUser2 } from "react-icons/lu";

export default function HomePage() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [wrongLogin, setWrongLogin] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const [emailError, setEmailError] = useState({
    isInvalid: false,
    errorMessage: "",
  });

  const [passwordError, setPasswordError] = useState({
    isInvalid: false,
    errorMessage: "",
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
      setEmailError({
        isInvalid: true,
        errorMessage: "Por favor, introduce un correo electrónico válido.",
      });
    } else {
      setEmailError({ isInvalid: false, errorMessage: "" });
    }

    if (!password) {
      setPasswordError({
        isInvalid: true,
        errorMessage: "Por favor, introduce una contraseña.",
      });
    } else {
      setPasswordError({ isInvalid: false, errorMessage: "" });
    }

    if (email && emailRegex.test(email) && password) {
      if (email === "apolo@web.com" && password === "test1234!") {
        toast("Bienvenido/a");
        navigate("/characters");
      } else {
        toast(
          <div>
            <p className="font-semibold">Error en credenciales.</p>
            <p>
              Los datos a ingresar para esta prueba son:
              <br />
              <strong>Correo:</strong> apolo@web.com
              <br />
              <strong>Contraseña:</strong> test1234!
            </p>
          </div>
        );

        setWrongLogin(true);
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-5 text-white min-h-screen relative h-full w-full bg-slate-950">
      <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] max-w-full rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
      <div className="absolute bottom-0 right-[20%] top-[-10%] h-[500px] w-[500px] max-w-full rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
      <div className="flex flex-col gap-2 items-center w-80 max-w-full h-96 border border-indigo-700 text-white p-2 bg-blue-950/60 rounded-lg">
        <h1 className="pt-2 text-xl text-center">Bienvenido/a</h1>
        <LuUser2 className="stroke-1 w-20 h-20 border-2 border-indigo-700 rounded-full p-2" />
        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex w-full flex-col items-end gap-3"
        >
          <Input
            type="email"
            required={true}
            name="email"
            label="Email"
            variant="bordered"
            color="warning"
            isInvalid={emailError.isInvalid}
            errorMessage={emailError.errorMessage}
            defaultValue="apolo@web.com"
          />

          <Input
            required={true}
            name="password"
            label="Password"
            variant="bordered"
            color="warning"
            isInvalid={passwordError.isInvalid}
            errorMessage={passwordError.errorMessage}
            placeholder="Introduce tu contraseña"
            defaultValue="test1234!"
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
                aria-label="toggle password visibility"
              >
                {isVisible ? (
                  <BsEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <BsEye className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
          />
          {wrongLogin && (
            <div className="text-sm text-red-700 text-center w-full -mt-2">
              Usuario o contraseña incorrectos
            </div>
          )}
          <Button type="submit" color="primary" className="my-4 mx-auto">
            Ingresar
          </Button>
        </form>
      </div>
    </div>
  );
}
