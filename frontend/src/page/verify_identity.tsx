import FormIdentity from "../components/FormIdentity";
import HeaderVerified from "../components/HeaderVerified";
import PageHeader from "../components/PageHeader";
import ProgresBar from "../components/ProgresBar";
import type {Identity} from "../types/AuthTypes/Identity";
import type {Error} from "../hooks/useIdentityForm";
import type { Touched } from "../hooks/useIdentityForm";

type Props = {
   values: Identity,
   errors: Error,
   touched: Touched,
   handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
   handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export default function verify_identity({values, errors, touched, handleChange, handleBlur} : Props) {
  return (
    <div>
      <div className = "grid">
        <div className = "grid-cols-2">
          <div className = "col-span-2">
            <HeaderVerified />
          </div>
          <div className = "col-span-2">
            <PageHeader />
          </div>
        </div>
        <div className = "flex bg-[#fafbfe]">
          <div>
            <ProgresBar />
          </div>
          <div className = " flex justify-center w-full">
            <FormIdentity values = {values} errors = {errors} touched = {touched} handleChange = {handleChange} handleBlur = {handleBlur}/>
          </div>
        </div>
      </div>
    </div>
  );
}
