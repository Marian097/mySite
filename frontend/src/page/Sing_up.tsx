import FormSingUp from "../components/FormSingUp";
import FormLogin from "../components/FormLogin";

type Props = {
  name: string;
  email: string;
  password: string;
  showRulePass: boolean;
  showRuleFields: boolean;
  isSingUp: boolean;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  singUp: () => void;
  login: () => void;
};

export default function Sing_up({
  isSingUp,
  email,
  password,
  name,
  showRulePass,
  showRuleFields,
  setEmail,
  setName,
  setPassword,
  singUp,
  login,
}: Props) {
  return (
    <div>
      {isSingUp ? (
        <>
          <FormSingUp email = {email} password = {password} name = {name} showRulePass = {showRulePass}  showRuleFields = { showRuleFields } setEmail = {setEmail} setName = {setName} setPassword = {setPassword} singUp= {singUp}/>
        </>
      ) : (
        <>
          <FormLogin  email = {email} password = {password} login = {login} showRuleFields = {showRuleFields} setEmail = {setEmail} setPassword = {setPassword}/>
        </>
      )}
    </div>
  );
}
