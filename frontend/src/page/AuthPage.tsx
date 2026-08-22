import FormProvider from "../components/SignUpProvider.tsx";
import FormLogin from "../components/FormLogin.tsx";
import type { User } from "../types/AuthTypes/User.ts";
import type { Errors } from "../types/AuthTypes/Errors.ts";
import type { Touched } from "../types/AuthTypes/Touched.ts";
import type { ErrorsLogin } from "../types/AuthTypes/ErrorsLogin.ts";
import AuthHeader from "../components/AuthHeader.tsx"

type Props = {
  value: User;
  errors: Errors;
  errorsLogin: ErrorsLogin;
  isLoggedForm: boolean;
  touched: Touched;
  message: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  singUpProvider: (e: React.FormEvent<HTMLFormElement>) => void;
  login: (e: React.FormEvent<HTMLFormElement>) => void;
  setIsLoggedForm: (value: boolean) => void;
};

export default function Sign_up({
  value,
  errors,
  touched,
  errorsLogin,
  message,
  isLoggedForm,
  setIsLoggedForm,
  handleChange,
  handleBlur,
  singUpProvider,
  login,
}: Props) {
  return (
    <div>
      <AuthHeader setIsLoggedForm={setIsLoggedForm} />
      {isLoggedForm ? (
        <>
          <FormLogin
            value={value}
            login={login}
            errors={errors}
            touched={touched}
            handleChange={handleChange}
            handleBlur={handleBlur}
            errorsLogin={errorsLogin}
          />
        </>
      ) : (
        <>
          {" "}
          <FormProvider
            message={message}
            value={value}
            errors={errors}
            touched={touched}
            handleChange={handleChange}
            handleBlur={handleBlur}
            singUpProvider={singUpProvider}
            errorsLogin={errorsLogin}
          />
        </>
      )}
    </div>
  );
}
