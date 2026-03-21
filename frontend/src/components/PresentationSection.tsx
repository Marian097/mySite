import BtExplore from "../components/small_components/BtnExplore";

export default function PresentationSection() {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <div>
        <div className="text-white flex flex-col items-center font-myGeistExtraBold text-xl xl:text-5xl">
          <div>
            <h1>Software solutions for Startups & SaaS</h1>
          </div>
          <div>
            <h2>Alongside us, your dream can become reality</h2>
          </div>
        </div>
        <div className="text-white py-3 font-myGeistMedium xl:text-2xl xl:w-5xl text-center">
          <span>
            With us, you get fully equipped business websites ready to launch,
            including all essential pages, components, and sections needed for a
            strong online presence. Built with React 19.x and Tailwind CSS, our
            templates are fast, scalable, and easy to customize — helping you go
            live quicker and focus on growing your business.
          </span>
        </div>
        <div className = "flex justify-center py-4">
          <BtExplore />
        </div>
      </div>
    </div>
  );
}
