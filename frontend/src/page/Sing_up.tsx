import FormSingUp from "../components/FormSingUp";
import FormLogin from "../components/FormLogin";
import type { User } from "../types/User";
import type { Errors } from "../types/Errors";
import type { Touched } from "../types/Touched";
import type { ErrorsLogin } from "../types/ErrorsLogin";

type Props = {
  value: User,
  isSingUp: boolean,
  errors: Errors,
  errorsLogin: ErrorsLogin;
  touched: Touched,
  isLoggedForm: boolean,
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  setIsLoggedForm: (option : boolean) => void,
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void,
  singUp: (e: React.FormEvent<HTMLFormElement>) => void,
  login: (e: React.FormEvent<HTMLFormElement>) => void
};

export default function Sing_up({
  value,
  isSingUp,
  errors,
  touched,
  isLoggedForm,
  errorsLogin,
  setIsLoggedForm,
  handleChange,
  handleBlur,
  singUp,
  login,
}: Props) {
  return (
    <div>
      {isSingUp ? (
        <>
          <FormSingUp value = {value} errors = {errors} touched = {touched} handleChange = {handleChange} handleBlur = {handleBlur} singUp = {singUp} isLoggedForm = {isLoggedForm} setIsLoggedForm = {setIsLoggedForm} errorsLogin = {errorsLogin}/>
        </>
      ) : (
        <>
          <FormLogin value = {value} login = {login} errors = {errors} touched = {touched} handleChange = {handleChange} handleBlur = {handleBlur} isLoggedForm = {isLoggedForm} setIsLoggedForm = {setIsLoggedForm} errorsLogin = {errorsLogin}/>
        </>
      )}
    </div>
  );
}
