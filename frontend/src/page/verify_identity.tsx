import FormIdentity from "../components/FormIdentity";
import HeaderVerified from "../components/HeaderVerified";
import PageHeader from "../components/PageHeader";
import ProgresBar from "../components/ProgresBar";
import type { Identity } from "../types/AuthTypes/Identity";
import type { Error } from "../hooks/useIdentityForm";
import type { Touched } from "../hooks/useIdentityForm";
import FormFiscal from "../components/FormFiscal";
import type { Fiscal, Errors, TouchedBussines } from "../hooks/useBussinesForm";
import { Routes, Route } from "react-router";

type Props = {
  values: Identity;
  errors: Error;
  touched: Touched;
  response: string;
  isSteps: number;
  handleSubmitIdentity: (e: React.FormEvent<HTMLFormElement>) => void;
  setIsSteps: (step: number) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  valuesBussiness: Fiscal;
  errorsBussiness: Errors;
  touchedBussiness: TouchedBussines;
  handleChangeBussiness: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  handleBlurBussiness: (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  handleSubmitFiscalData: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function verify_identity({
  values,
  valuesBussiness,
  errorsBussiness,
  errors,
  touchedBussiness,
  handleChangeBussiness,
  handleBlurBussiness,
  handleSubmitFiscalData,
  touched,
  isSteps,
  response,
  handleChange,
  handleBlur,
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
            <Routes>
              <Route
                path="/identity"
                element={
                  <FormIdentity
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    setIsSteps={setIsSteps}
                    handleSubmitIdentity={handleSubmitIdentity}
                    response={response}
                  />
                }
              />
              <Route
                path="/bussiness"
                element={
                  <FormFiscal
                    setIsSteps={setIsSteps}
                    valuesBussiness={valuesBussiness}
                    errorsBussiness={errorsBussiness}
                    touchedBussiness={touchedBussiness}
                    handleChangeBussiness={handleChangeBussiness}
                    handleBlurBussiness={handleBlurBussiness}
                    handleSubmitFiscalData={handleSubmitFiscalData}
                  />
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}
