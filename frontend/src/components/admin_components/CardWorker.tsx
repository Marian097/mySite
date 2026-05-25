import users from "../../assets/image/Total_users.png";



type Props = {
   getWorkers: () => void
}

export default function CardUser({getWorkers}: Props) {
  return (
    <div onClick = {() => getWorkers()} className=" rounded-md h-full">
      <div className = "ml-2">
        <div className="flex justify-between">
          <div className="flex flex-col py-2 gap-y-1">
            <div>
              <span className = "font-nunito font-semibold text-xs">Total Worker</span>
            </div>
            <div>
              <span className = "font-nunito font-bold">407896</span>
            </div>
          </div>
          <div className="mr-2 mt-2">
            <img src={users} alt="" className="h-7" />
          </div>
        </div>
        <div>
          <span>Procentaj</span>
        </div>
      </div>
    </div>
  );
}
