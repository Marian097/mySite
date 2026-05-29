

export default function SeachBar() {
  return (
    <div>
      <form className="col-span-12 md:col-span-6">
        <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">
          {" "}
          Search{" "}
        </label>
        <div className="relative mb-3">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block py-0.5 pl-10 text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 max-w-xs"
            placeholder="Search user by email"
          ></input>
        </div>
      </form>
    </div>
  );
}
