import CardWorker from "./CardWorker";
import CardWorkerApproved from "./CardWorkerApproved";
import CardWorkerPending from "./CardWorkerPending";
import CardWorkerRejected from "./CardWorkerRejected";
import TableUsers from "./TableUsers";
import TopBar from "./TopBar";

export default function MainUsers() {
  return (
    <div>
      <TopBar />
      <div className="ml-5 py-5">
        <h1>Users</h1>
      </div>
      <div className="min-w-full justify-items-center">
        <section className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 w-40 sm:w-100 md:w-180 px gap-5">
          <div className="bg-white rounded-md">
            <CardWorker />
          </div>
          <div className="bg-white rounded-md">
            <CardWorkerRejected />
          </div>
          <div className="bg-white rounded-md">
            <CardWorkerApproved />
          </div>
          <div className="bg-white rounded-md">
            <CardWorkerPending />
          </div>
        </section>
        <section className="text-sm px-10 border border-black bg-white rounded-xl">
          <TableUsers />
        </section>
      </div>
    </div>
  );
}
