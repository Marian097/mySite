export default function NavSort() {
  return (
    <div>
      <div className="tags mt-5 md:mt-0 col-span-12 md:col-span-6 md:justify-self-end">
        <ul className="flex items-center flex-wrap gap-2">
          <li className="capitalize text-xs font-nunito font-semibold hover:bg-indigo-600 hover:text-white  py-0.5 px-5 rounded-md cursor-pointer active">
            All
          </li>
          <li className="capitalize text-xs font-nunito font-semibold hover:bg-indigo-600 hover:text-white  py-0.5 px-5 rounded-md cursor-pointer">
            CI Expiring
          </li>
          <li className="capitalize text-xs font-nunito font-semibold hover:bg-indigo-600 hover:text-white  py-0.5 px-5 rounded-md cursor-pointer">
            Approved
          </li>
          <li className="capitalize text-xs font-nunito font-semibold hover:bg-indigo-600 hover:text-white  py-0.5 px-5 rounded-md cursor-pointer">
            Pending
          </li>
          <li className="capitalize text-xs font-nunito font-semibold hover:bg-indigo-600 hover:text-white py-0.5 px-5 rounded-md cursor-pointer">
            Rejected
          </li>
        </ul>
      </div>
    </div>
  );
}
