import FormSignUp from "../components/SignUpProvider.tsx";
import FormLogin from "../components/FormLogin.tsx";
import Header from "../components/Header.tsx";
import type { User } from "../types/AuthTypes/User.ts";
import type { Errors } from "../types/AuthTypes/Errors.ts";
import type { Touched } from "../types/AuthTypes/Touched.ts";
import type { ErrorsLogin } from "../types/AuthTypes/ErrorsLogin.ts";
import { Routes, Route } from "react-router";

type Props = {
  value: User;
  errors: Errors;
  errorsLogin: ErrorsLogin;
  touched: Touched;
  isLoggedForm: boolean;
  message: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setIsLoggedForm: (option: boolean) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  singUpProvider: (e: React.FormEvent<HTMLFormElement>) => void;
  loginProvider: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function Sign_up({
  value,
  errors,
  touched,
  isLoggedForm,
  errorsLogin,
  message,
  setIsLoggedForm,
  handleChange,
  handleBlur,
  singUpProvider,
  loginProvider,
}: Props) {
  return (
    <div>
      <Header
      />

      <Routes>
        <Route
          path="/sign-up"
          element={
            <FormSignUp
              message={message}
              value={value}
              errors={errors}
              touched={touched}
              handleChange={handleChange}
              handleBlur={handleBlur}
              singUpProvider={singUpProvider}
              isLoggedForm={isLoggedForm}
              setIsLoggedForm={setIsLoggedForm}
              errorsLogin={errorsLogin}
            />
          }
        />

        <Route
          path="/login"
          element={
            <FormLogin
              value={value}
              loginProvider={loginProvider}
              errors={errors}
              touched={touched}
              handleChange={handleChange}
              handleBlur={handleBlur}
              isLoggedForm={isLoggedForm}
              setIsLoggedForm={setIsLoggedForm}
              errorsLogin={errorsLogin}
            />
          }
        />
      </Routes>
    </div>
  );
}
