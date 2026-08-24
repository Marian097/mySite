import uploads from "../assets/image/uploads.png";
import certificate from "../assets/image/certificate.png";
import forward from "../assets/image/arrow forward.svg";
import { useEffect } from "react";
import type {
  Fiscal,
  Errors,
  TouchedBussines,
  Counties,
} from "../hooks/useBussinesForm";

type Props = {
  valuesBussiness: Fiscal;
  errorsBussiness: Errors;
  touchedBussiness: TouchedBussines;
  updateStep: (step: string) => void;
  isSteps: string;
  handleChangeBussiness: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  handleBlurBussiness: (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  handleSubmitFiscalData: (e: React.FormEvent<HTMLFormElement>) => void;
  counties: Counties;
  getCounties: () => void;
};
export default function FormFiscal({
  updateStep,
  isSteps,
  valuesBussiness,
  errorsBussiness,
  touchedBussiness,
  counties,
  getCounties,
  handleChangeBussiness,
  handleBlurBussiness,
  handleSubmitFiscalData,
}: Props) {
  useEffect(() => {
    updateStep(isSteps);
  }, []);

  useEffect(() => {
    getCounties();
  }, []);

  return (
    <div className="mt-3">
      <form
        className="w-full max-w-5xl rounded-lg bg-white shadow-xl"
        encType="multipart/form-data"
        onSubmit={handleSubmitFiscalData}
      >
        <div className="border-b border-gray-200 px-6 py-4">
          <h3 className="font-nunito text-lg font-bold text-[#1D1F42]">
            Informații despre firmă
          </h3>
        </div>

        <div className="grid gap-8 p-6 lg:grid-cols-2">
          {/* Coloana stângă */}
          <div className="space-y-5">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="name_bussines"
                className="font-nunito text-sm font-semibold text-[#1D1F42]"
              >
                Numele firmei
              </label>

              <input
                id="name_bussines"
                name="name_bussines"
                onBlur={handleBlurBussiness}
                onChange={handleChangeBussiness}
                type="text"
                placeholder="Ex: SC Exemplu SRL"
                className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />
              <div>
                {touchedBussiness.name_bussines &&
                  errorsBussiness.name_bussines && (
                    <p className="text-[#999AA9] font-bold font-nunito text-xs sm:text-sm">{`*${errorsBussiness.name_bussines}`}</p>
                  )}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="type_bussines"
                className="font-nunito text-sm font-semibold text-[#1D1F42]"
              >
                Formă juridică
              </label>

              <select
                id="type_bussines"
                name="type_bussines"
                value={valuesBussiness.type_bussines}
                onBlur={handleBlurBussiness}
                onChange={handleChangeBussiness}
                className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              >
                <option value="" disabled>
                  Selectează forma juridică
                </option>
                <option value="pfa">PFA</option>
                <option value="ii">ÎI</option>
                <option value="if">ÎF</option>
                <option value="srl">SRL</option>
                <option value="sa">SA</option>
              </select>
              <div>
                {touchedBussiness.type_bussines &&
                  errorsBussiness.type_bussines && (
                    <p className="text-[#999AA9] font-bold font-nunito text-xs sm:text-sm">{`*${errorsBussiness.type_bussines}`}</p>
                  )}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="cif"
                className="font-nunito text-sm font-semibold text-[#1D1F42]"
              >
                CIF
              </label>

              <input
                id="cif"
                name="cif"
                type="text"
                onBlur={handleBlurBussiness}
                onChange={handleChangeBussiness}
                placeholder="RO12345678"
                className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />
              <div>
                {touchedBussiness.cif && errorsBussiness.cif && (
                  <p className="text-[#999AA9] font-bold font-nunito text-xs sm:text-sm">{`*${errorsBussiness.cif}`}</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-nunito text-sm font-bold text-[#1D1F42]">
                Adresă sediu social
              </h4>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="address"
                  className="font-nunito text-sm font-semibold text-[#1D1F42]"
                >
                  Stradă, număr
                </label>

                <input
                  id="address"
                  name="address"
                  type="text"
                  onBlur={handleBlurBussiness}
                  onChange={handleChangeBussiness}
                  placeholder="Ex: Str. Exemplu nr. 10"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                />
                <div>
                  {touchedBussiness.address && errorsBussiness.address && (
                    <p className="text-[#999AA9] font-bold font-nunito text-xs sm:text-sm">{`*${errorsBussiness.address}`}</p>
                  )}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="city"
                    className="font-nunito text-sm font-semibold text-[#1D1F42]"
                  >
                    Localitate
                  </label>

                  <input
                    id="city"
                    name="city"
                    type="text"
                    onBlur={handleBlurBussiness}
                    onChange={handleChangeBussiness}
                    placeholder="Ex: București"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  />
                  <div>
                    {touchedBussiness.address && errorsBussiness.address && (
                      <p className="text-[#999AA9] font-bold font-nunito text-xs sm:text-sm">{`*${errorsBussiness.address}`}</p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="county"
                    className="font-nunito text-sm font-semibold text-[#1D1F42]"
                  >
                    Județ
                  </label>

                  <select
                    id="county"
                    name="county"
                    value={valuesBussiness.county}
                    onBlur={handleBlurBussiness}
                    onChange={handleChangeBussiness}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  >
                    {counties.nameCounties.map((c, idx) => (
                      <option value={c} key = {idx}>{c}</option>
                    ))}
                  </select>
                  <div>
                    {touchedBussiness.address && errorsBussiness.address && (
                      <p className="text-[#999AA9] font-bold font-nunito text-xs sm:text-sm">{`*${errorsBussiness.address}`}</p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="postal_code"
                    className="font-nunito text-sm font-semibold text-[#1D1F42]"
                  >
                    Cod poștal
                  </label>

                  <input
                    id="postal_code"
                    name="postal_code"
                    onBlur={handleBlurBussiness}
                    onChange={handleChangeBussiness}
                    type="text"
                    placeholder="010001"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="country"
                    className="font-nunito text-sm font-semibold text-[#1D1F42]"
                  >
                    Țară
                  </label>

                  <select
                    id="country"
                    name="country"
                    value={valuesBussiness.country}
                    onBlur={handleBlurBussiness}
                    onChange={handleChangeBussiness}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  >
                    <option value="ro">România</option>
                  </select>
                  <div>
                    {touchedBussiness.address && errorsBussiness.address && (
                      <p className="text-[#999AA9] font-bold font-nunito text-xs sm:text-sm">{`*${errorsBussiness.address}`}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="border-l flex flex-col gap-y-4 border-gray-200 pl-8 py-">
            <div className="bg-[#fbfbfc] col-span-2 border-2 border-dashed border-[#eff1f5] rounded-md h-2/6">
              <div className="flex flex-col items-center">
                <div>
                  <img src={uploads} alt="" className="h-15" />
                </div>
                <div>
                  <span className="font-bold font font-nunito text-xs sm:text-sm text-shadow-xs text-[#1D1F42]">
                    Trage poza aici
                  </span>
                  <span className="ml-1 text-xs sm:text-sm text-[#1D1F42]">
                    sau
                  </span>
                </div>
              </div>
              <div className="absolute">
                <input
                  type="file"
                  name="certificate_registration"
                  id="certificate_registration"
                  className="opacity-0"
                  onBlur={handleBlurBussiness}
                  onChange={handleChangeBussiness}
                />
                <div>
                  {touchedBussiness.certificate_registration &&
                    errorsBussiness.certificate_registration && (
                      <p className="text-[#999AA9] font-bold font-nunito text-xs sm:text-sm">{`*${errorsBussiness.certificate_registration}`}</p>
                    )}
                </div>
              </div>
              <div className="flex justify-center">
                <h4 className="border bg-[#fafafa] border-[#eff1f5]  py-1 px-3 rounded-md font-bold font-nunito text-xs sm:text-sm text-[#1D1F42]">
                  Alege fișier
                </h4>
              </div>
              <div className="flex flex-col justify-center items-center">
                <span className="font-bold font-nunito text-xs text-[#999AA9]">
                  Format acceptat: JPG, PNG - Max. 5MB{" "}
                </span>
                <span className="border-2 rounded-md px-5 bg-[#fafafa] border-[#eff1f5] font-bold font-nunito text-xs sm:text-sm  "></span>
              </div>
            </div>
            <div>
              <img src={certificate} alt="certificat de inregistrare" />
            </div>
          </div>
          <div className="grid grid-cols-4 gap-x-3 px-4 mx-4 py-2 mt-4">
            <div>
              <button
                type="button"
                className="col-span-1 hover:bg-[#fbfbfc] focus-visible:outline-[#fbfbfc62] focus-visible:outline-2 flex justify-center border-2 rounded-md font-semibold border-[#eff1f5]  bg-white-500 px-3 py-1.5 text-sm/6 text-[#1D1F42]"
              >
                Anulează
              </button>
            </div>
            <div></div>
            <div>
              <button
                type="submit"
                className="col-span-2 flex w-full items-center justify-center rounded-md bg-indigo-500 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Continuă
                <img src={forward} alt="" className="h-5" />
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
