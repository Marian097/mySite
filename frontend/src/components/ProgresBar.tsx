import  GDPR  from "../assets/image/GDPR.png"


export default function ProgresBar() {
  return (
    <div className = "min-h-screen flex flex-col w-44 px-3 bg-[#fafbfe]">
      <div className = "flex gap-x-3">
        <div className = "border-2 flex items-center justify-center rounded-full w-8 h-8 border-black/40 font-bold font-nunito text-xs sm:text-sm"><span>1</span></div>
        <div>
          <div className = "text-sm">
            <h4 className = "font-bold font-nunito">Verificare identitate</h4>
            <span className = "text-xs font-extralight font-nunito">Documentele tale</span>
          </div>   
        </div>
      </div>
      <div className="ml-3.5 h-12 w-0.5 bg-black/40"></div>
      <div  className = "flex gap-x-3 mt-2">
        <div className = "border-2 rounded-full w-8 h-8  flex items-center justify-center border-black/40 font-bold font-nunito text-xs sm:text-sm">2</div>
        <div className = "text-sm">
          <h4 className = "font-bold font-nunito">Date fiscale</h4>
          <span className = "text-xs font-extralight font-nunito">Informații despre firmă</span>
        </div>
      </div>
      <div className="ml-3.5 h-12 w-0.5 bg-black/40"></div>
      <div className = "flex gap-x-3 mt-2">
        <div className = "border-2 rounded-full w-8 h-8  flex items-center justify-center border-black/40 font-bold font-nunito text-xs sm:text-sm">3</div>
        <div className = "text-sm">
          <h4 className = "font-bold font-nunito">Profil muncitor</h4>
          <span className = "text-xs font-extralight font-nunito">Detaliile profilului tău</span>
        </div>    
      </div>
      <div className ="flex gap-x-3 pl-2 py-5 mt-5 border-2 rounded-md border-black/35">
        <div><img src={GDPR} alt="" className = "sm:h-7 h-5 w-20"/></div>
        <div>
          <div><h4 className = "font-bold font-nunito text-xs sm:text-sm">Datele tale sunt protejate</h4></div>
          <div><span className = "font-medium font-nunito text-xs sm:text-sm">Folosim criptare și respectăm standardele GDPR.</span></div>
        </div>
      </div>
    </div>
  );
}
