import FormWorker from "../components/SignUpWorker.tsx";
import FormLogin from "../components/FormLogin";
import Header from "../components/Header.tsx";
import type { User } from "../types/AuthTypes/User";
import type { Errors } from "../types/AuthTypes/Errors";
import type { Touched } from "../types/AuthTypes/Touched";
import type { ErrorsLogin } from "../types/AuthTypes/ErrorsLogin";
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
  singUp: (e: React.FormEvent<HTMLFormElement>) => void;
  login: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function Sing_up({
  value,
  errors,
  touched,
  isLoggedForm,
  errorsLogin,
  message,
  setIsLoggedForm,
  handleChange,
  handleBlur,
  singUp,
  login,
}: Props) {
  return (
    <div>
      <Header
      />

      <Routes>
        <Route
          path="/sign-up"
          element={
            <FormWorker
              message={message}
              value={value}
              errors={errors}
              touched={touched}
              handleChange={handleChange}
              handleBlur={handleBlur}
              singUp={singUp}
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
              login={login}
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
