import BtnSubmit from "./small_components/BtnSubmit";
import FreeTrialSection from "./small_components/FreeTrialSection";
import InputEmail from "./small_components/InputEmail";
import InputPassword from "./small_components/InputPassword";
import InputUsername from "./small_components/InputUsername";
import LogoSectionForm from "./small_components/LogoSectionForm";

export default function FormSingUp() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <form
        action=""
        className="bg-black/55 rounded-xl px-10 flex flex-col justify-center gap-2"
      >
      
          <LogoSectionForm />
          <InputUsername/>
          <InputEmail />
          <InputPassword />
          <BtnSubmit />
          <FreeTrialSection />
      </form>
    </div>
  );
}
