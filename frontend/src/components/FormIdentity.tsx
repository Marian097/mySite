import documents from "../assets/image/documents.png";
import info from "../assets/image/info.png";
import ci from "../assets/image/buletin.png"
import uploads from "../assets/image/uploads.png"
import selfie from "../assets/image/SELFIE.png"
import forward from "../assets/image/arrow forward.svg"
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



export default function FormIdentity({values, errors, touched, handleChange, handleBlur} : Props) {
  return (
    <form
      action=""
      className="bg-white rounded-md shadow-xl w-3xl h-11/12 py-3 mt-3"
      encType="multipart/form-data"
    >
      <div className="flex items-center pl-3">
        <div>
          <img src={documents} alt="" className="h-10" />
        </div>
        <div className="">
          <h4 className="font-extrabold font-nunito text-xs sm:text-sm text-shadow-sm text-[#1D1F42]">
            Încărcare documente
          </h4>
        </div>
      </div>
      <div className="border-b-2 mx-5 border-[#e7eaf3]"></div>
      <div className="mt-5 px-5">
        <div className="flex items-center">
          <h4 className="font-extrabold font-nunito text-xs sm:text-sm text-shadow-sm text-[#1D1F42]">
            Poză buletin (față)
          </h4>
          <div>
            <img src={info} className="h-10 mt-1" alt="" />
          </div>
        </div>
        <div>
          <span className="font-bold font-nunito text-xs text-[#999AA9]">
            Asigură-te că toate detaliile sunt clare și lizibile
          </span>
        </div>
        <div className = "grid grid-cols-3 gap-x-3 mt-4">
          <div className = "bg-[#fbfbfc] col-span-2 border-2 border-dashed border-[#eff1f5] rounded-md">
            <div className = "flex flex-col items-center">
              <div>
              <img src={uploads} alt="" className = "h-15" />
            </div>
            <div>
              <span className = "font-bold font font-nunito text-xs sm:text-sm text-shadow-xs text-[#1D1F42]">Trage poza aici</span><span className = "ml-1 text-xs sm:text-sm text-[#1D1F42]">sau</span>
            </div>
            </div>
            <div className = "absolute">
              <input type="file" name = "ci_image" id="" className="opacity-0" value = {values.ci_image}  onBlur = {handleBlur} onChange = {handleChange} />
            </div>
            <div className = "flex justify-center">
              <h4 className = "border bg-[#fafafa] border-[#eff1f5]  py-1 px-3 rounded-md font-bold font-nunito text-xs sm:text-sm text-[#1D1F42]">Alege fișier</h4>   
            </div>
            <div className = "flex justify-center"><span className="font-bold font-nunito text-xs text-[#999AA9]">Format acceptat: JPG, PNG - Max. 5MB </span></div>
          </div>
          <div className = "bg-[#fbfbfc] border-2 border-[#eff1f5] rounded-xl">
            <img src={ci} alt="" className = ""/>
          </div>
        </div>
        <div>
           {touched.ci_image && errors.ci_image && (
          <p style={{ color: "red" }}>{errors.ci_image}</p>
        )}
        </div>
        <div className = "pt-3 mt-3">
          <div className = "flex items-center">
            <div><h4 className = "font-bold font font-nunito text-xs sm:text-sm text-shadow-xs text-[#1D1F42]">Data de expirare</h4></div>
            <div><img src={info} alt="" className = "h-10 mt-1" /></div>
          </div>
          <div><span className="font-bold font-nunito text-xs text-[#999AA9]">Introdu data de expirare a buletinului</span></div>
          <div className = "mt-1"><input type="date" name="date" id="" className = "border-2 rounded-md border-[#eff1f5]" value ={values.date} onBlur = {handleBlur} onChange = {handleChange}  /></div>
        </div>
         <div>
           {touched.date && errors.date && (
          <p style={{ color: "red" }}>{errors.date}</p>
        )}
        </div>
        <div className = "py-3">
          <div className = "flex items-center">
            <div><span className = "font-extrabold font-nunito text-xs sm:text-sm text-shadow-xs text-[#1D1F42]">Selfie cu buletinul</span></div>
            <div><img src={info} alt="" className = "h-10 mt-1" /></div>
          </div>
          <div>
            <span className="font-bold font-nunito text-xs text-[#999AA9]">Ține buletinul în mână lângă față</span>
          </div>
        </div>
      </div>
       <div className = "grid grid-cols-3 gap-x-3 mt-4 px-5">
          <div className = "bg-[#fbfbfc] col-span-2 border-2 border-dashed border-[#eff1f5] rounded-md">
            <div className = "flex flex-col items-center">
              <div>
              <img src={uploads} alt="" className = "h-15" />
            </div>
            <div>
              <span className = "font-bold font font-nunito text-xs sm:text-sm text-shadow-xs text-[#1D1F42]">Trage poza aici</span><span className = "ml-1 text-xs sm:text-sm text-[#1D1F42]">sau</span>
            </div>
            </div>
            <div className = "absolute">
              <input type="file" name="ci_selfie" id="" className="opacity-0" value = {values.ci_selfie} onBlur = {handleBlur} onChange = {handleChange}/>
            </div>
            <div className = "flex justify-center">
              <h4 className = "border bg-[#fafafa] border-[#eff1f5]  py-1 px-3 rounded-md font-bold font-nunito text-xs sm:text-sm text-[#1D1F42]">Alege fișier</h4>   
            </div>
             <div className = "flex justify-center"><span className="font-bold font-nunito text-xs text-[#999AA9]">Format acceptat: JPG, PNG - Max. 5MB </span></div>
          </div>
          <div className = "bg-[#fbfbfc] border-2 border-[#eff1f5] rounded-xl">
            <img src={selfie} alt="" className = ""/>
          </div>  
        </div>
        <div>
           {touched.ci_selfie && errors.ci_selfie && (
          <p style={{ color: "red" }}>{errors.ci_selfie}</p>
        )}
        </div>
         <div className="border-b-2 border-[#e7eaf3] mt-6"></div>
        <div className = "grid grid-cols-4 gap-x-3 px-4 mx-4 py-2 mt-4">
          <div className = "col-span-1 hover:bg-[#fbfbfc] focus-visible:outline-[#fbfbfc62] focus-visible:outline-2 flex justify-center border-2 rounded-md font-semibold border-[#eff1f5]  bg-white-500 px-3 py-1.5 text-sm/6 text-[#1D1F42]"><button>Anulează</button></div>
          <div></div>
          <div className = "col-span-2 flex w-full items-center gap-x-2 justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"><button>Continuă</button><img src={forward} alt="" className = "h-5" /></div>
        </div>
    </form>
  );
}
