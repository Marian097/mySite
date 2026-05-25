export default function THead() {
  return (
    <div className = "grid grid-cols-6  rounded-md gap-x-8 text-center bg-[#f5f6fa] font-nunito font-bold overflow-auto text-xs sm:text-sm items-center">
      <div> 
        <span>Id</span>
      </div>
      <div>
        <span>Name</span>
      </div>
      <div>
        <span>Email</span>
      </div>
      <div>
        <span>CI</span>
      </div>
      <div>
        <span>CI exipration</span>
      </div>
      <div>
        <span>Status</span>
      </div>
    </div>
  );
}
