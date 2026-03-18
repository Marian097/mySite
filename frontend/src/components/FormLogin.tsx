import LogoSectionForm from "./small_components/LogoSectionForm";
import InputEmail from "./small_components/InputEmail";
import InputPassword from "./small_components/InputPassword";
import BtnLogin from "./small_components/BtnLogin";
import FreeTrialSection from "./small_components/FreeTrialSection";
import ForgotPassword from "./small_components/ForgotPassword";
import type { User } from "../types/User";
import type { Errors } from "../types/Errors";
import type { Touched } from "../types/Touched";
import { useEffect } from "react"
import type { ErrorsLogin } from "../types/ErrorsLogin";




type Props = {
  value: User;
  errors: Errors;
  touched: Touched;
  errorsLogin:ErrorsLogin;
  isLoggedForm:boolean,
  setIsLoggedForm: (option: boolean) => void,
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  login: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function FormLogin({ value, errors, touched, isLoggedForm, errorsLogin, 
  setIsLoggedForm, handleChange, handleBlur, login }: Props) {

    useEffect(() => {
      if (!isLoggedForm)
      {
        setIsLoggedForm(true)
      }
    }, [])
  return (
    <div className="min-h-screen flex justify-center items-center">
      <form
        action=""
        className="bg-black/55 rounded-xl px-10 flex flex-col justify-center gap-2"
        onSubmit={login}
      >
        <LogoSectionForm />
        <InputEmail value={value} handleChange={handleChange} errors = {errors} touched = {touched} handleBlur = {handleBlur} />
        <InputPassword value={value} handleChange={handleChange} errors = {errors} touched = {touched} handleBlur = {handleBlur} isLoggedForm = {isLoggedForm} setIsLoggedForm = {setIsLoggedForm} errorsLogin = {errorsLogin}/>
        <ForgotPassword />
        <BtnLogin />
        <FreeTrialSection />
      </form>
    </div>
  );
}
