import type React from "react";
import BtnSubmit from "./small_components/BtnSubmit";
import FreeTrialSection from "./small_components/FreeTrialSection";
import InputEmail from "./small_components/InputEmail";
import InputPassword from "./small_components/InputPassword";
import InputUsername from "./small_components/InputUsername";
import LogoSectionForm from "./small_components/LogoSectionForm";
import type { User } from "../types/User";
import type { Errors } from "../types/Errors";
import type { Touched } from "../types/Touched";
import type { ErrorsLogin } from "../types/ErrorsLogin";
import {useEffect} from "react";

type Props = {
  value: User;
  errors: Errors;
  touched: Touched;
  errorsLogin:ErrorsLogin;
  isLoggedForm: boolean;
  message: string;
  setIsLoggedForm: (option: boolean) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  singUp: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function FormSingUp({
  value,
  errors,
  touched,
  errorsLogin,
  isLoggedForm,
  message,
  setIsLoggedForm,
  handleChange,
  handleBlur,
  singUp,
}: Props) {

  useEffect(() => {
    if (isLoggedForm === true){
      setIsLoggedForm(false)
    }
  }, [])

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form
        action=""
        className="bg-black/55 rounded-xl px-10 flex flex-col justify-center gap-2"
        onSubmit={singUp}
      >
        <LogoSectionForm />
        <InputUsername
          value={value}
          handleChange={handleChange}
          handleBlur={handleBlur}
          errors={errors}
          touched={touched}
        />
        <InputEmail
          value={value}
          handleChange={handleChange}
          handleBlur={handleBlur}
          errors={errors}
          touched={touched}
        />
        <InputPassword
          value={value}
          handleChange={handleChange}
          handleBlur={handleBlur}
          errors={errors}
          touched={touched}
          isLoggedForm = {isLoggedForm}
          setIsLoggedForm = {setIsLoggedForm}
          errorsLogin = {errorsLogin}
        />
        <p style = {{color: "white"}}>{message}</p>
        <BtnSubmit />
        <FreeTrialSection />
      </form>
    </div>
  );
}
