import LogoSectionForm from "./small_components/LogoSectionForm";
import InputEmail from "./small_components/InputEmail";
import InputPassword from "./small_components/InputPassword";
import BtnLogin from "./small_components/BtnLogin";
import FreeTrialSection from "./small_components/FreeTrialSection";
import ForgotPassword from "./small_components/ForgotPassword";

type Props = {
  email: string;
  password: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword:React.Dispatch<React.SetStateAction<string>>;
  login: (e: React.SubmitEvent<HTMLFormElement> ) => void;
};

export default function FormLogin({
  email,
  password,
  setEmail,
  setPassword,
  login,
}: Props) {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <form
        action=""
        className="bg-black/55 rounded-xl px-10 flex flex-col justify-center gap-2"
        onSubmit = {login}
      >
        <LogoSectionForm />
        <InputEmail email={email} setEmail={setEmail} />
        <InputPassword password={password} setPassword={setPassword} />
        <ForgotPassword />
        <BtnLogin/>
        <FreeTrialSection />
      </form>
    </div>
  );
}
