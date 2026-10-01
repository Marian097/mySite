

export default function thead() {
  return (
    <div className = "grid grid-cols-7  rounded-md gap-x-8 text-center bg-[#f5f6fa] font-nunito font-bold overflow-auto text-xs sm:text-sm items-center">
      <div> 
        <span>id</span>
      </div>
      <div>
        <span>nume</span>
      </div>
      <div>
        <span>email</span>
      </div>
      <div>
        <span>ci</span>
      </div>
      <div>
        <span>data de expirare</span>
      </div>
      <div>
        <span>status</span>
      </div>
       <div>
        <span>actiune</span>
      </div>
    </div>
  );
}
