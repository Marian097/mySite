import BtnSubmit from "./small_components/BtnSubmit";
import FreeTrialSection from "./small_components/FreeTrialSection";
import InputEmail from "./small_components/InputEmail";
import InputPassword from "./small_components/InputPassword";
import InputUsername from "./small_components/InputUsername";
import LogoSectionForm from "./small_components/LogoSectionForm";

type Props = {
  email: string;
  password: string;
  name: string;
  showRulePass: boolean;
  showRuleFields: boolean;
  setEmail:React.Dispatch<React.SetStateAction<string>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setPassword:React.Dispatch<React.SetStateAction<string>>;
  singUp: () => void;
};

export default function FormSingUp({
  email,
  password,
  name,
  showRulePass,
  showRuleFields,
  setEmail,
  setName,
  setPassword,
  singUp,
}: Props) {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <form
        action=""
        className="bg-black/55 rounded-xl px-10 flex flex-col justify-center gap-2"
      >
        <LogoSectionForm />
        <InputUsername name={name} setName={setName} />
        <InputEmail email={email} setEmail={setEmail} />
        <InputPassword password={password} setPassword={setPassword} />
        <BtnSubmit singUp={singUp} />
        <FreeTrialSection />

        {showRuleFields && (
          <p className="text-red-500">Toate câmpurile sunt obligatorii</p>
        )}

        {showRulePass && (
          <ul className="text-red-500 text-sm">
            <li>Minim 8 caractere</li>
            <li>Minim un simbol: @, !</li>
            <li>Cel puțin o literă mare și un număr</li>
          </ul>
        )}
      </form>
    </div>
  );
}
