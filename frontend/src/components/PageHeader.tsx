export default function PageHeader() {
  return (

        <div className = "flex flex-col items-center bg-[#fafbfe] py-4">
          <div className = "flex items-center px-3 rounded-md bg-[#dfe2fd] h-5">
            <span className = "text-[#4b5bf0] font-extrabold font-nunito text-xs">PASUL 1 DIN 3</span>
          </div>
          <div className = "flex flex-col items-center pt-3">
            <h4 className = "font-extrabold font-nunito text-sm sm:text-lg">Verificare identitate</h4>
            <span className = "font-bold font-nunito text-black/80 text-xs sm:text-sm mt-2">
              Te rugăm să încarci documentele pentru a ne confirma identitatea.
            </span>
          </div>
    </div>
  );
}
