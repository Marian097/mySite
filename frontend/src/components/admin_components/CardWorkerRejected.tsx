import rejected from "../../assets/image/employee.png"

export default function CardUsersRejected() {
  return (
     <div className="rounded-md h-full">
      <div className = "ml-2">
        <div className="flex justify-between">
          <div className="flex flex-col py-2 gap-y-1">
            <div>
              <span className = "font-nunito font-semibold text-xs">Total Rejected</span>
            </div>
            <div>
              <span className = "font-nunito font-bold">407896</span>
            </div>
          </div>
          <div className="mr-2 mt-2">
            <img src={rejected} alt="" className="h-7" />
          </div>
        </div>
        <div className = "pb-2">
          <span>Procentaj</span>
        </div>
      </div>
    </div>
  )
}
