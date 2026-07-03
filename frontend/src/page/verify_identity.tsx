import FormIdentity from "../components/FormIdentity";
import HeaderVerified from "../components/HeaderVerified";
import PageHeader from "../components/PageHeader";
import ProgresBar from "../components/ProgresBar";

export default function verify_identity() {
  return (
    <div>
      <div className = "grid">
        <div className = "grid-cols-2">
          <div className = "col-span-2">
            <HeaderVerified />
          </div>
          <div className = "col-span-2">
            <PageHeader />
          </div>
        </div>
        <div className = "flex bg-[#fafbfe] border">
          <div>
            <ProgresBar />
          </div>
          <div className = " flex justify-center border w-full">
            <FormIdentity />
          </div>
        </div>
      </div>
    </div>
  );
}
