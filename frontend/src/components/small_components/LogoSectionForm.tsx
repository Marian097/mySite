import Logo from "../../assets/logo/Logo_v2.png"


export default function LogoSectionForm() {
  return (
    <div className="flex min-h-full flex-col justify-center px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src={Logo}
          className="mx-auto h-auto"
        />
        <h2 className="pb-8 text-center text-2xl/9 font-bold tracking-tight text-white">
          Sign in to your account
        </h2>
      </div>
    </div>
  );
}
