import approved from "../../assets/image/approved.png"

export default function CardUsersApproved() {
  return (
     <div className="border border-black rounded-md h-full">
      <div className = "ml-2">
        <div className="flex justify-between">
          <div className="flex flex-col py-2 gap-y-1">
            <div>
              <span className = "font-nunito font-semibold text-xs">Users Approved</span>
            </div>
            <div>
              <span className = "font-bold">230962</span>
            </div>
          </div>
          <div className="mr-2 mt-2">
            <img src={approved} alt="" className="h-7" />
          </div>
        </div>
        <div className = "pb-2">
          <span>Procentaj</span>
        </div>
      </div>
    </div>
  )
}
