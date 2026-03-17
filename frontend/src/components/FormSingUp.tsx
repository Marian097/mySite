import type React from "react";
import BtnSubmit from "./small_components/BtnSubmit";
import FreeTrialSection from "./small_components/FreeTrialSection";
import InputEmail from "./small_components/InputEmail";
import InputPassword from "./small_components/InputPassword";
import InputUsername from "./small_components/InputUsername";
import LogoSectionForm from "./small_components/LogoSectionForm";
import NumberPhone from "./small_components/NumberPhone";
import type { User } from "../types/User";
import type { Errors } from "../types/Errors";
import type { Touched } from "../types/Touched";

type Props = {
  value: User;
  errors: Errors;
  touched: Touched;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  singUp: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function FormSingUp({
  value,
  errors,
  touched,
  handleChange,
  handleBlur,
  singUp,
}: Props) {
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
        />
        <NumberPhone
          value={value}
          handleChange={handleChange}
          errors={errors}
          touched={touched}
          handleBlur={handleBlur}
        />
        <BtnSubmit />
        <FreeTrialSection />
      </form>
    </div>
  );
}
