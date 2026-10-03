export default function Tbody() {
  return (
    <div>
      {" "}
      <div className="grid grid-cols-7 bg-white gap-8 text-center py-3 overflow-auto text-xs sm:text-sm">
        {" "}
        <div>
          {" "}
          <span>1</span>{" "}
        </div>{" "}
        <div>
          {" "}
          <span>Username</span>{" "}
        </div>{" "}
        <div className="overflow-auto">
          {" "}
          <span>email@example.com</span>{" "}
        </div>{" "}
        <div>
          {" "}
          <span>
            {" "}
            <img src="/placeholder.jpg" alt="" className="h-15" />{" "}
          </span>{" "}
        </div>{" "}
        <div>
          {" "}
          <span>01.01.2026</span>{" "}
        </div>{" "}
        <div>
          {" "}
          <span className="text-green-600 font-nunito"> Success </span>{" "}
        </div>{" "}
        <div className="flex flex-col font-nunito text-xs gap-y-1">
          {" "}
          <span>
            {" "}
            <button className="w-full justify-center rounded-md bg-green-600 text-xs font-semibold text-white hover:bg-green-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500">
              {" "}
              Approve{" "}
            </button>{" "}
          </span>{" "}
          <span>
            {" "}
            <button className="w-full justify-center rounded-md bg-indigo-500 text-xs font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
              {" "}
              Reject{" "}
            </button>{" "}
          </span>{" "}
          <span>
            {" "}
            <button className="w-full flex justify-center rounded-md bg-blue-500 text-xs font-semibold text-white hover:bg-blue-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500">
              {" "}
              More{" "}
            </button>{" "}
          </span>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
