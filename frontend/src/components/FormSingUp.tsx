import type React from "react";
import BtnSubmit from "./small_components/BtnSubmit";
import FreeTrialSection from "./small_components/FreeTrialSection";
import InputEmail from "./small_components/InputEmail";
import InputPassword from "./small_components/InputPassword";
import InputUsername from "./small_components/InputUsername";
import LogoSectionForm from "./small_components/LogoSectionForm";
import NumberPhone from "./small_components/NumberPhone";


type Props = {
  email: string;
  password: string;
  name: string;
  phone: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
  sing_up: (e: React.SubmitEvent<HTMLFormElement>) => void;
};

export default function FormSingUp({
  email,
  password,
  name,
  phone,
  setEmail,
  setPhone,
  setName,
  setPassword,
  sing_up,
}: Props) {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <form
        action=""
        className="bg-black/55 rounded-xl px-10 flex flex-col justify-center gap-2"
        onSubmit={sing_up}
      >
        <LogoSectionForm />
        <InputUsername name={name} setName={setName} />
        <InputEmail email={email} setEmail={setEmail} />
        <InputPassword password={password} setPassword={setPassword} />
        <NumberPhone
          phone={phone}
          setPhone={setPhone}
        />
        <BtnSubmit />
        <FreeTrialSection />
      </form>
    </div>
  );
}
