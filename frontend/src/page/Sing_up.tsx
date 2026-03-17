import FormSingUp from "../components/FormSingUp";
import FormLogin from "../components/FormLogin";
import type { User } from "../types/User";
import type { Errors } from "../types/Errors";
import type { Touched } from "../types/Touched";

type Props = {
  value: User,
  isSingUp: boolean,
  errors: Errors,
  touched: Touched,
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void,
  singUp: (e: React.FormEvent<HTMLFormElement>) => void,
  login: () => void
};

export default function Sing_up({
  value,
  isSingUp,
  errors,
  touched,
  handleChange,
  handleBlur,
  singUp,
  login,
}: Props) {
  return (
    <div>
      {isSingUp ? (
        <>
          <FormSingUp value = {value} errors = {errors} touched = {touched} handleChange = {handleChange} handleBlur = {handleBlur} singUp = {singUp}/>
        </>
      ) : (
        <>
          <FormLogin value = {value} login = {login} errors = {errors} touched = {touched} handleChange = {handleChange} handleBlur = {handleBlur}/>
        </>
      )}
    </div>
  );
}
