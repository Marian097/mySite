import GDPR from "../assets/image/GDPR.png";
import SECURE from "../assets/image/secure.png";

export default function HeaderVerified() {
  return (
    <div className="flex justify-between px-6 h-full">
      <div className="flex items-center gap-x-2">
        <div>
          <img src={GDPR} alt="" className="h-7" />
        </div>
        <div>
          <h3 className="font-extrabold font-nunito text-xs sm:text-sm">
            Workify
          </h3>
        </div>
      </div>
      <div className="flex items-center">
        <div>
          <img src={SECURE} alt="" className="h-12" />
        </div>
        <div>
          <h3 className="font-extrabold font-nunito text-xs sm:text-sm text-black/55">
            Securizat și confidențial
          </h3>
        </div>
      </div>
    </div>
  );
}
