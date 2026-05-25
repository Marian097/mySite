import type { User } from "../../types/AuthTypes/User";
import type { Errors } from "../../types/AuthTypes/Errors";
import type { Touched } from "../../types/AuthTypes/Touched";
import type { ErrorsLogin } from "../../types/AuthTypes/ErrorsLogin";

type Props = {
  value: User;
  errors: Errors;
  touched: Touched;
  isLoggedForm: boolean,
  errorsLogin: ErrorsLogin;
  setIsLoggedForm: (option: boolean) => void,
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
};

export default function InputPassword({
  value,
  errors,
  touched,
  isLoggedForm,
  errorsLogin,
  handleChange,
  handleBlur,
}: Props) {
  return (
    <div>
      <label htmlFor="password" className="text-white font-medium">
        Parola:
      </label>
      <input
        type="password"
        placeholder="Parola"
        className={
         errors.password
            ? "border border-red-500  bg-red-100 rounded-md ml-1.5 w-1/2"
            : "border border-white rounded-md bg-white ml-1.5 w-1/2"
        }
        name="password"
        value={value.password}
        onChange={handleChange}
        onBlur={handleBlur}
      />
     {
  touched.password && errors.password && errorsLogin.password &&  (
    <>
      {isLoggedForm
        ? <p style={{ color: "red" }}>{errorsLogin.password}</p>
        : <p style={{ color: "red" }}>{errors.password}</p>}
    </>
  )
}
    </div>
  );
}
