import FormSingUp from "../components/FormSingUp";
import FormLogin from "../components/FormLogin";

type Props = {
  name: string;
  email: string;
  password: string;
  phone: string;
  isSingUp: boolean;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  sing_up: (e: React.SubmitEvent<HTMLFormElement> ) => void;
  login: (e: React.SubmitEvent<HTMLFormElement> ) => void;
};

export default function Sing_up({
  isSingUp,
  email,
  password,
  name,
  phone,
  setEmail,
  setPhone,
  setName,
  setPassword,
  sing_up,
  login,
}: Props) {
  return (
    <div>
      {isSingUp ? (
        <>
          <FormSingUp email = {email} phone = {phone} setPhone = {setPhone} password = {password} name = {name} setEmail = {setEmail} setName = {setName} setPassword = {setPassword} sing_up= {sing_up}/>
        </>
      ) : (
        <>
          <FormLogin  email = {email} password = {password} login = {login} setEmail = {setEmail} setPassword = {setPassword}/>
        </>
      )}
    </div>
  );
}
