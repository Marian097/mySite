import FormIdentity from "../components/FormIdentity";
import HeaderVerified from "../components/HeaderVerified";
import PageHeader from "../components/PageHeader";
import ProgresBar from "../components/ProgresBar";
import type { Identity } from "../types/AuthTypes/Identity";
import FormFiscal from "../components/FormFiscal";
import type {
  Fiscal,
  Counties,
} from "../hooks/useFiscalForm";

type Props = {
  personalValues: Identity;
  response: string;
  isSteps: string;
  updateStep: (step: string) => void;
  handleSubmitIdentity: (e: React.FormEvent<HTMLFormElement>) => void;
  setIsSteps: (step: string) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fiscalValues: Fiscal;
  handleChangeBussiness: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;

  handleSubmitFiscalData: (e: React.FormEvent<HTMLFormElement>) => void;
  counties: Counties;
  getCounties: () => void;
  isSubmmitPersonalForm: boolean;
};

export default function verify_identity({
  personalValues,
  fiscalValues,
  handleChangeBussiness,
  handleSubmitFiscalData,
  updateStep,
  isSubmmitPersonalForm,
  isSteps,
  response,
  counties,
  getCounties,
  handleChange,
  setIsSteps,
  handleSubmitIdentity,
}: Props) {
  return (
    <div>
      <div className="grid">
        <div className="grid-cols-2">
          <div className="col-span-2">
            <HeaderVerified />
          </div>
          <div className="col-span-2">
            <PageHeader isSteps={isSteps} />
          </div>
        </div>
        <div className="flex bg-[#fafbfe]">
          <div>
            <ProgresBar isSteps={isSteps} />
          </div>
          <div className="flex justify-center w-full h-auto">
            {isSteps === "1" && (
              <>
                <FormIdentity
                  personalValues={personalValues}
                  isSubmmitPersonalForm={isSubmmitPersonalForm}
                  setIsSteps={setIsSteps}
                  handleChange={handleChange}
                  handleSubmitIdentity={handleSubmitIdentity}
                  response={response}
                />
              </>
            )}

            {isSteps === "2" && (
              <>
                <FormFiscal
                  updateStep={updateStep}
                  isSteps={isSteps}
                  fiscalValues={fiscalValues}
                  counties={counties}
                  getCounties={getCounties}
                  handleChangeBussiness={handleChangeBussiness}
                  handleSubmitFiscalData={handleSubmitFiscalData}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
