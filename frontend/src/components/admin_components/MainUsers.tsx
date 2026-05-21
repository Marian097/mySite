import CardUsers from "./CardUsers";
import CardUsersApproved from "./CardUsersApproved";
import CardUsersRejected from "./CardUsersRejected";
import TopBar from "./TopBar";

export default function MainUsers() {
  return (
    <div>
      <TopBar />
      <div className="ml-5 py-5">
        <h1>Dashboard</h1>
      </div>
      <div className="min-w-full justify-items-center">
        <section className="grid grid-cols-3 w-120 px gap-5">
          <div className="bg-white rounded-md">
            <CardUsers />
          </div>
          <div className="bg-white rounded-md">
            <CardUsersRejected />
          </div>
          <div className="bg-white rounded-md">
            <CardUsersApproved />
          </div>
        </section>
      </div>
    </div>
  );
}
