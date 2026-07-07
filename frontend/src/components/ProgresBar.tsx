import  GDPR  from "../assets/image/GDPR.png"


export default function ProgresBar() {
  return (
    <div className = "min-h-screen flex flex-col w-44 px-3 bg-[#fafbfe]">
      <div className = "flex gap-x-3">
        <div className = "border-2 flex items-center justify-center rounded-full w-8 h-8 border-[#e7eaf3] font-bold font-nunito text-xs sm:text-sm text-[#838ea6]"><span>1</span></div>
        <div>
          <div className = "text-sm">
            <h4 className = "font-bold font-nunito text-[#727893]">Verificare identitate</h4>
            <span className = "text-xs font-extralight font-nunito text-[#6f7ea0]">Documentele tale</span>
          </div>   
        </div>
      </div>
      <div className="ml-3.5 h-12 w-0.5 bg-[#e7eaf3]"></div>
      <div  className = "flex gap-x-3 mt-2">
        <div className = "border-2 rounded-full w-8 h-8  flex items-center justify-center border-[#e7eaf3] font-bold font-nunito text-xs sm:text-sm text-[#838ea6]">2</div>
        <div className = "text-sm">
          <h4 className = "font-bold font-nunito text-[#727893]">Date fiscale</h4>
          <span className = "text-xs font-extralight font-nunito text-[#6f7ea0]">Informații despre firmă</span>
        </div>
      </div>
      <div className="ml-3.5 h-12 w-0.5 bg-[#e7eaf3]"></div>
      <div className = "flex gap-x-3 mt-2">
        <div className = "border-2 rounded-full w-8 h-8  flex items-center justify-center border-[#e7eaf3] font-bold font-nunito text-[#838ea6] text-xs sm:text-sm">3</div>
        <div className = "text-sm">
          <h4 className = "font-bold font-nunito text-[#727893]">Profil muncitor</h4>
          <span className = "text-xs font-extralight font-nunito text-[#6f7ea0]">Detaliile profilului tău</span>
        </div>    
      </div>
      <div className ="flex gap-x-3 pl-2 py-5 mt-5 border-2 rounded-md border-[#e7eaf3]">
        <div><img src={GDPR} alt="" className = "sm:h-7 h-5 w-20"/></div>
        <div>
          <div><h4 className = "font-bold font-nunito text-xs sm:text-sm">Datele tale sunt protejate</h4></div>
          <div><span className = "font-medium font-nunito text-xs sm:text-sm text-[#6f7ea0]">Folosim criptare și respectăm standardele GDPR.</span></div>
        </div>
      </div>
    </div>
  );
}
