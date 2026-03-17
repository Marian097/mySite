import LogoSectionForm from "./small_components/LogoSectionForm";
import InputEmail from "./small_components/InputEmail";
import InputPassword from "./small_components/InputPassword";
import BtnLogin from "./small_components/BtnLogin";
import FreeTrialSection from "./small_components/FreeTrialSection";
import ForgotPassword from "./small_components/ForgotPassword";
import type { User } from "../types/User";
import type { Errors } from "../types/Errors";
import type { Touched } from "../types/Touched";



type Props = {
  value: User;
  errors: Errors;
  touched: Touched;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  login: () => void;
};

export default function FormLogin({ value, errors, touched,  handleChange, handleBlur, login }: Props) {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <form
        action=""
        className="bg-black/55 rounded-xl px-10 flex flex-col justify-center gap-2"
        onSubmit={login}
      >
        <LogoSectionForm />
        <InputEmail value={value} handleChange={handleChange} errors = {errors} touched = {touched} handleBlur = {handleBlur} />
        <InputPassword value={value} handleChange={handleChange} errors = {errors} touched = {touched} handleBlur = {handleBlur} />
        <ForgotPassword />
        <BtnLogin />
        <FreeTrialSection />
      </form>
    </div>
  );
}
